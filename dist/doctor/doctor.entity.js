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
exports.DoctorEntity = void 0;
const user_base_entity_1 = require("../shared/user-base.entity");
const typeorm_1 = require("typeorm");
const department_entity_1 = require("../department/department.entity");
const appointment_entity_1 = require("../appointment/appointment.entity");
let DoctorEntity = class DoctorEntity extends user_base_entity_1.UserBaseEntity {
};
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true, length: '100' }),
    __metadata("design:type", String)
], DoctorEntity.prototype, "address", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], DoctorEntity.prototype, "daysAvailable", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], DoctorEntity.prototype, "timesAvailable", void 0);
__decorate([
    typeorm_1.ManyToOne(() => department_entity_1.DepartmentEntity, department => department.doctor),
    typeorm_1.JoinColumn({ name: 'departmentId' }),
    __metadata("design:type", department_entity_1.DepartmentEntity)
], DoctorEntity.prototype, "department", void 0);
__decorate([
    typeorm_1.OneToMany(() => appointment_entity_1.AppointmentEntity, appointment => appointment.doctor),
    __metadata("design:type", Array)
], DoctorEntity.prototype, "appointment", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], DoctorEntity.prototype, "departmentId", void 0);
DoctorEntity = __decorate([
    typeorm_1.Entity({ name: 'DoctorTbl' })
], DoctorEntity);
exports.DoctorEntity = DoctorEntity;
//# sourceMappingURL=doctor.entity.js.map