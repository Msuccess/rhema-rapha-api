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
exports.DepartmentController = void 0;
const role_guard_1 = require("./../authentication/auth-guard/role.guard");
const common_1 = require("@nestjs/common");
const department_service_1 = require("./department.service");
const role_decorator_1 = require("../authentication/auth-guard/role.decorator");
const query_model_1 = require("../shared/model/query.model");
const department_dto_1 = require("./dto/department.dto");
const passport_1 = require("@nestjs/passport");
let DepartmentController = class DepartmentController {
    constructor(departmentService) {
        this.departmentService = departmentService;
    }
    async getDepartments(res, query) {
        const response = await this.departmentService.getDepartments(query);
        return res
            .status(common_1.HttpStatus.OK)
            .json({ message: 'All Departments data', data: response });
    }
    async getById(id, res) {
        const response = await this.departmentService.getDepartment(id);
        return res
            .status(common_1.HttpStatus.OK)
            .json({ message: 'Department Data', data: response });
    }
    async create(patient, res) {
        const response = await this.departmentService.addDepartment(patient);
        return res
            .status(common_1.HttpStatus.CREATED)
            .json({ message: 'Department Created', data: response });
    }
    async update(id, patient, res) {
        const response = await this.departmentService.updateDepartment(id, patient);
        return res
            .status(common_1.HttpStatus.CREATED)
            .json({ message: 'Department updated', data: response });
    }
    async delete(id, res) {
        const response = await this.departmentService.deleteDepartment(id);
        return res
            .status(common_1.HttpStatus.CREATED)
            .json({ message: 'Department deleted', data: response });
    }
};
__decorate([
    common_1.Get(),
    role_decorator_1.Roles('admin'),
    __param(0, common_1.Res()),
    __param(1, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, query_model_1.QueryModel]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "getDepartments", null);
__decorate([
    common_1.Get('/:id'),
    role_decorator_1.Roles('admin', 'patient', 'doctor'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "getById", null);
__decorate([
    common_1.Post(),
    role_decorator_1.Roles('admin'),
    common_1.UsePipes(common_1.ValidationPipe),
    __param(0, common_1.Body()),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [department_dto_1.DepartmentDto, Object]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "create", null);
__decorate([
    common_1.Put('/:id'),
    role_decorator_1.Roles('admin'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Body()),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, department_dto_1.DepartmentDto, Object]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "update", null);
__decorate([
    common_1.Delete('/:id'),
    role_decorator_1.Roles('admin'),
    __param(0, common_1.Param('id')),
    __param(1, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], DepartmentController.prototype, "delete", null);
DepartmentController = __decorate([
    common_1.Controller('department'),
    common_1.UseGuards(passport_1.AuthGuard(), role_guard_1.RoleGuard),
    __metadata("design:paramtypes", [department_service_1.DepartmentService])
], DepartmentController);
exports.DepartmentController = DepartmentController;
//# sourceMappingURL=department.controller.js.map