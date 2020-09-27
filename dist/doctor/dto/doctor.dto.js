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
exports.DoctorDto = void 0;
const class_validator_1 = require("class-validator");
class DoctorDto {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Email cannot be null' }),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], DoctorDto.prototype, "email", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'First name cannot be null' }),
    __metadata("design:type", String)
], DoctorDto.prototype, "fullName", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Phonenumber cannot be null' }),
    __metadata("design:type", String)
], DoctorDto.prototype, "phonenumber", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Department cannot be null' }),
    __metadata("design:type", String)
], DoctorDto.prototype, "departmentId", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Days Available cannot be null' }),
    __metadata("design:type", String)
], DoctorDto.prototype, "daysAvailable", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Days Available cannot be null' }),
    __metadata("design:type", String)
], DoctorDto.prototype, "timesAvailable", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Password cannot be null' }),
    __metadata("design:type", String)
], DoctorDto.prototype, "password", void 0);
exports.DoctorDto = DoctorDto;
//# sourceMappingURL=doctor.dto.js.map