"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MedicationModule = void 0;
const medication_service_1 = require("./medication.service");
const medication_controller_1 = require("./medication.controller");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const medication_repository_1 = require("./medication.repository");
const passport_1 = require("@nestjs/passport");
const authentication_module_1 = require("../authentication/authentication.module");
let MedicationModule = class MedicationModule {
};
MedicationModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([medication_repository_1.MedicationRepository]),
            passport_1.PassportModule.register({
                defaultStrategy: 'jwt',
            }),
            authentication_module_1.AuthenticationModule,
        ],
        controllers: [medication_controller_1.MedicationController],
        providers: [medication_service_1.MedicationService],
    })
], MedicationModule);
exports.MedicationModule = MedicationModule;
//# sourceMappingURL=medication.module.js.map