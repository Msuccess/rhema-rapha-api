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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const doctor_repository_1 = require("./doctor.repository");
const result_1 = require("../configuration/exceptions/result");
const identity_user_service_1 = require("../authentication/identity-user/identity-user.service");
let DoctorService = class DoctorService {
    constructor(doctorRepository, identityUserService) {
        this.doctorRepository = doctorRepository;
        this.identityUserService = identityUserService;
    }
    async getDoctors(query) {
        try {
            return await this.doctorRepository.find({
                relations: ['appointment'],
                take: query.pageSize,
                skip: query.pageSize * (query.page - 1),
                order: { createdAt: 'DESC' },
            });
        }
        catch (error) {
            new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getByDepartmentId(id) {
        try {
            return await this.doctorRepository.find({
                where: 'departmentId is' + id,
            });
        }
        catch (error) {
            new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getDoctor(id) {
        try {
            return await this.doctorRepository.findOne(id);
        }
        catch (error) {
            new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getDoctorByEmail(email) {
        try {
            return await this.doctorRepository.findOne({ email });
        }
        catch (error) {
            new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async addDoctor(newDoctor) {
        try {
            return await this.doctorRepository.save(newDoctor);
        }
        catch (error) {
            return new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateDoctor(id, newDoctor) {
        try {
            const dbDoctor = this.getDoctor(id);
            if (dbDoctor) {
                return await this.doctorRepository.update(id, newDoctor);
            }
            else {
                return new result_1.ResultException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (error) {
            return new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteDoctor(id) {
        try {
            return await this.doctorRepository.delete(id);
        }
        catch (error) {
            new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
DoctorService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(doctor_repository_1.DoctorRepository)),
    __metadata("design:paramtypes", [doctor_repository_1.DoctorRepository,
        identity_user_service_1.IdentityUserService])
], DoctorService);
exports.DoctorService = DoctorService;
//# sourceMappingURL=doctor.service.js.map