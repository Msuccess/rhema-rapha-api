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
exports.PatientEntity = void 0;
const user_base_entity_1 = require("../shared/user-base.entity");
const typeorm_1 = require("typeorm");
const appointment_entity_1 = require("../appointment/appointment.entity");
let PatientEntity = class PatientEntity extends user_base_entity_1.UserBaseEntity {
};
__decorate([
    typeorm_1.Column({ type: Date, nullable: false }),
    __metadata("design:type", Date)
], PatientEntity.prototype, "dateOfBirth", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true, length: '100' }),
    __metadata("design:type", String)
], PatientEntity.prototype, "address", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true, length: '20' }),
    __metadata("design:type", String)
], PatientEntity.prototype, "bloodType", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true, length: '20' }),
    __metadata("design:type", String)
], PatientEntity.prototype, "height", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: true, length: '20' }),
    __metadata("design:type", String)
], PatientEntity.prototype, "bloodPressure", void 0);
__decorate([
    typeorm_1.OneToMany(() => appointment_entity_1.AppointmentEntity, appointment => appointment.patient),
    __metadata("design:type", Array)
], PatientEntity.prototype, "appointment", void 0);
PatientEntity = __decorate([
    typeorm_1.Entity({ name: 'PatientTbl' })
], PatientEntity);
exports.PatientEntity = PatientEntity;
//# sourceMappingURL=patient.entity.js.map