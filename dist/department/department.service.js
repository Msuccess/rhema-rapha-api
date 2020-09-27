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
exports.DepartmentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const department_repository_1 = require("./department.repository");
const result_1 = require("../configuration/exceptions/result");
const query_model_1 = require("../shared/model/query.model");
let DepartmentService = class DepartmentService {
    constructor(departmentRepository) {
        this.departmentRepository = departmentRepository;
    }
    async getDepartments(query) {
        try {
            return await this.departmentRepository.find({
                relations: ['doctor'],
                take: query.pageSize,
                skip: query.pageSize * (query.page - 1),
                order: { createdAt: 'DESC' },
            });
        }
        catch (error) {
            new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getDepartment(id) {
        try {
            return await this.departmentRepository.findOne(id);
        }
        catch (error) {
            new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async addDepartment(newDepartment) {
        try {
            return await this.departmentRepository.save(newDepartment);
        }
        catch (error) {
            return new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateDepartment(id, newDepartment) {
        try {
            const dbDepartment = this.getDepartment(id);
            if (dbDepartment) {
                return await this.departmentRepository.update(id, newDepartment);
            }
            else {
                return new result_1.ResultException('User not found', common_1.HttpStatus.NOT_FOUND);
            }
        }
        catch (error) {
            return new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteDepartment(id) {
        try {
            return await this.departmentRepository.delete(id);
        }
        catch (error) {
            new result_1.ResultException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
DepartmentService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(department_repository_1.DepartmentRepository)),
    __metadata("design:paramtypes", [department_repository_1.DepartmentRepository])
], DepartmentService);
exports.DepartmentService = DepartmentService;
//# sourceMappingURL=department.service.js.map