"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const doctor_dto_1 = require("./../doctor/dto/doctor.dto");
const patient_dto_1 = require("./../patient/dto/patient.dto");
const identity_user_service_1 = require("./identity-user/identity-user.service");
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("../configuration/config");
const password_encrypter_service_1 = require("./auth-configuration/password-encrypter.service");
const identity_user_dto_1 = require("./identity-user/dto/identity-user.dto");
const result_1 = require("../configuration/exceptions/result");
const doctor_service_1 = require("../doctor/doctor.service");
const patient_service_1 = require("../patient/patient.service");
const user_base_entity_1 = require("../shared/user-base.entity");
let AuthenticationService = class AuthenticationService {
    constructor(passwordEncryptedService, jwtService, identityUserService, doctorService, patientService) {
        this.passwordEncryptedService = passwordEncryptedService;
        this.jwtService = jwtService;
        this.identityUserService = identityUserService;
        this.doctorService = doctorService;
        this.patientService = patientService;
    }
    async register(data) {
        try {
            const dbUser = await this.validateUser(data.email);
            if (typeof dbUser === 'object' && dbUser !== null) {
                throw new common_1.HttpException({ message: 'User Already Exit' }, common_1.HttpStatus.BAD_REQUEST);
            }
            const password = (await this.passwordEncryptedService.encrypt(data.password)).toString();
            const user = new identity_user_dto_1.IdentityUserDto();
            user.email = data.email;
            user.fullName = data.fullName;
            user.phonenumber = data.phonenumber;
            user.password = password;
            switch (data.role.toLowerCase()) {
                case 'patient':
                    const patient = new patient_dto_1.PatientDto();
                    patient.dateOfBirth = data.dateOfBirth;
                    patient.email = data.email;
                    patient.fullName = data.fullName;
                    patient.password = password;
                    patient.phonenumber = data.phonenumber;
                    patient.role = user_base_entity_1.UserRole.PATIENT;
                    const patientDb = await this.patientService.addPatient(patient);
                    if (typeof patientDb === 'object' && patientDb !== null) {
                        user.role = user_base_entity_1.UserRole.PATIENT;
                        return this.identityUserService.createUser(user);
                    }
                case 'doctor':
                    const doctor = new doctor_dto_1.DoctorDto();
                    doctor.daysAvailable = data.daysAvailable;
                    doctor.email = data.email;
                    doctor.fullName = data.fullName;
                    doctor.password = password;
                    doctor.departmentId = data.departmentId;
                    doctor.phonenumber = data.phonenumber;
                    doctor.daysAvailable = data.daysAvailable;
                    doctor.timesAvailable = data.timesAvailable;
                    doctor.role = user_base_entity_1.UserRole.DOCTOR;
                    const doctorDb = await this.doctorService.addDoctor(doctor);
                    if (typeof doctorDb === 'object' && doctorDb !== null) {
                        user.role = user_base_entity_1.UserRole.DOCTOR;
                        return this.identityUserService.createUser(user);
                    }
                case 'admin':
                    user.role = user_base_entity_1.UserRole.ADMIN;
                    return this.identityUserService.createUser(user);
                default:
                    return new result_1.ResultException('Role not allowed', common_1.HttpStatus.BAD_REQUEST);
            }
        }
        catch (error) {
            return new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async signIn(user) {
        try {
            const dbUser = await this.identityUserService.getUserByEmail(user.email);
            if (!dbUser || Object.keys(dbUser).length === 0) {
                return new result_1.ResultException('Wrong credentials', common_1.HttpStatus.BAD_REQUEST);
            }
            const verifyPassword = await this.passwordEncryptedService.decrypt(user.password, dbUser.password);
            if (verifyPassword) {
                const token = await this.createToken(dbUser.id, dbUser.email, dbUser.role);
                return { token, dbUser };
            }
        }
        catch (error) {
            return new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async googleLogin(req) {
        if (!req.user) {
            return new result_1.ResultException('No user from google', common_1.HttpStatus.BAD_REQUEST);
        }
        if (this.validateUser(req.user.email)) {
            const newUser = new identity_user_dto_1.IdentityUserDto();
            newUser.email = req.user.email;
            newUser.fullName = req.user.fullName;
            newUser.avatar = req.user.picture;
            newUser.role = user_base_entity_1.UserRole.PATIENT;
            return this.identityUserService.createUser(newUser);
        }
        else {
            const dbUser = await this.validateUser(req.user.email);
            const token = await this.createToken(dbUser.id, req.user.email, dbUser.role);
            return { token, dbUser };
        }
    }
    async validateUser(email) {
        try {
            return await this.identityUserService.getUserByEmail(email);
        }
        catch (error) {
            return new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createToken(id, email, role) {
        const expiresIn = config_1.EXPIRESIN;
        const user = { id: id, email: email, role: role };
        const token = this.jwtService.sign(user);
        return { expiresIn: expiresIn, token };
    }
    verifyToken(token) {
        this.jwtService.verify(token);
    }
};
AuthenticationService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [password_encrypter_service_1.PasswordEncrypterService,
        jwt_1.JwtService,
        identity_user_service_1.IdentityUserService,
        doctor_service_1.DoctorService,
        patient_service_1.PatientService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map