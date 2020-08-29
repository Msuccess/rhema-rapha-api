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
exports.MedicationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const medication_repository_1 = require("./medication.repository");
const result_1 = require("../configuration/exceptions/result");
let MedicationService = class MedicationService {
    constructor(medicationRepository) {
        this.medicationRepository = medicationRepository;
    }
    async getMedications(query) {
        try {
            return await this.medicationRepository.find({
                take: query.pageSize,
                skip: query.pageSize * (query.page - 1),
                order: { createdAt: 'DESC' },
            });
        }
        catch (error) {
            new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getMedicationsByUserId(userId) {
        try {
            return await this.medicationRepository.find({ where: userId });
        }
        catch (error) {
            new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getMedication(id) {
        try {
            return await this.medicationRepository.findOne(id);
        }
        catch (error) {
            new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async addMedication(newMedication) {
        try {
            return await this.medicationRepository.save(newMedication);
        }
        catch (error) {
            return new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateMedication(id, newMedication) {
        try {
            const dbMedication = this.getMedication(id);
            if (dbMedication) {
                return await this.medicationRepository.update(id, newMedication);
            }
            else {
                return new result_1.ResultException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (error) {
            return new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteMedication(id) {
        try {
            return await this.medicationRepository.delete(id);
        }
        catch (error) {
            new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
MedicationService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(medication_repository_1.MedicationRepository)),
    __metadata("design:paramtypes", [medication_repository_1.MedicationRepository])
], MedicationService);
exports.MedicationService = MedicationService;
//# sourceMappingURL=medication.service.js.map