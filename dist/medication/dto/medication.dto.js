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
exports.MedicationDto = void 0;
const class_validator_1 = require("class-validator");
class MedicationDto {
}
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Medicine name cannot be null' }),
    __metadata("design:type", String)
], MedicationDto.prototype, "medicineName", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Dose cannot be null' }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], MedicationDto.prototype, "dose", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Note cannot be null' }),
    __metadata("design:type", String)
], MedicationDto.prototype, "note", void 0);
__decorate([
    class_validator_1.IsNotEmpty({ message: 'Dose 0ne cannot be null' }),
    __metadata("design:type", Date)
], MedicationDto.prototype, "dose0ne", void 0);
__decorate([
    class_validator_1.IsDateString(),
    __metadata("design:type", Date)
], MedicationDto.prototype, "doseTwo", void 0);
__decorate([
    class_validator_1.IsDateString(),
    __metadata("design:type", Date)
], MedicationDto.prototype, "doseThree", void 0);
__decorate([
    class_validator_1.IsDateString(),
    __metadata("design:type", Date)
], MedicationDto.prototype, "doseFour", void 0);
exports.MedicationDto = MedicationDto;
//# sourceMappingURL=medication.dto.js.map