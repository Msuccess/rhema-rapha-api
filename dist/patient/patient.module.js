"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PatientModule = void 0;
const shared_module_1 = require("./../shared/shared.module");
const password_encrypter_service_1 = require("./../authentication/auth-configuration/password-encrypter.service");
const patient_controller_1 = require("./patient.controller");
const patient_service_1 = require("./patient.service");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const patient_repository_1 = require("./patient.repository");
const passport_1 = require("@nestjs/passport");
let PatientModule = class PatientModule {
};
PatientModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([patient_repository_1.PatientRepository]),
            passport_1.PassportModule.register({
                defaultStrategy: 'jwt',
            }),
            shared_module_1.SharedModule,
        ],
        controllers: [patient_controller_1.PatientController],
        providers: [patient_service_1.PatientService, password_encrypter_service_1.PasswordEncrypterService],
        exports: [patient_service_1.PatientService],
    })
], PatientModule);
exports.PatientModule = PatientModule;
//# sourceMappingURL=patient.module.js.map