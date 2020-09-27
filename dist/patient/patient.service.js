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
exports.PatientService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const patient_repository_1 = require("./patient.repository");
const result_1 = require("../configuration/exceptions/result");
let PatientService = class PatientService {
    constructor(patientRepository) {
        this.patientRepository = patientRepository;
    }
    async getPatients(query) {
        try {
            return await this.patientRepository.find({
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
    async getPatient(id) {
        try {
            return await this.patientRepository.findOne(id);
        }
        catch (error) {
            new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getPatientByEmail(email) {
        try {
            return await this.patientRepository.findOne({ email });
        }
        catch (error) {
            new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async addPatient(newPatient) {
        try {
            return await this.patientRepository.save(newPatient);
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updatePatient(id, newPatient) {
        try {
            const dbPatient = this.getPatient(id);
            if (dbPatient) {
                return await this.patientRepository.update(id, newPatient);
            }
            else {
                return new result_1.ResultException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (error) {
            return new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deletePatient(id) {
        try {
            return await this.patientRepository.delete(id);
        }
        catch (error) {
            new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
PatientService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(patient_repository_1.PatientRepository)),
    __metadata("design:paramtypes", [patient_repository_1.PatientRepository])
], PatientService);
exports.PatientService = PatientService;
//# sourceMappingURL=patient.service.js.map