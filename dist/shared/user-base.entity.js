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
exports.UserBaseEntity = exports.UserRole = void 0;
const typeorm_1 = require("typeorm");
var UserRole;
(function (UserRole) {
    UserRole["DOCTOR"] = "doctor";
    UserRole["PATIENT"] = "patient";
    UserRole["USER"] = "user";
    UserRole["ADMIN"] = "admin";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
class UserBaseEntity extends typeorm_1.BaseEntity {
}
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], UserBaseEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: false,
        unique: true,
        length: '100',
    }),
    __metadata("design:type", String)
], UserBaseEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: false, length: '500' }),
    __metadata("design:type", String)
], UserBaseEntity.prototype, "fullName", void 0);
__decorate([
    typeorm_1.Column({
        type: 'varchar',
        nullable: false,
        length: '15',
        unique: true,
    }),
    __metadata("design:type", String)
], UserBaseEntity.prototype, "phonenumber", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: false, length: '100' }),
    __metadata("design:type", String)
], UserBaseEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ type: 'varchar', nullable: false, length: '20' }),
    __metadata("design:type", String)
], UserBaseEntity.prototype, "role", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", String)
], UserBaseEntity.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", String)
], UserBaseEntity.prototype, "updatedAt", void 0);
exports.UserBaseEntity = UserBaseEntity;
//# sourceMappingURL=user-base.entity.js.map