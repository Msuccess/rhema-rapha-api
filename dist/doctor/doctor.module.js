"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorModule = void 0;
const password_encrypter_service_1 = require("./../authentication/auth-configuration/password-encrypter.service");
const doctor_service_1 = require("./doctor.service");
const common_1 = require("@nestjs/common");
const doctor_controller_1 = require("./doctor.controller");
const typeorm_1 = require("@nestjs/typeorm");
const passport_1 = require("@nestjs/passport");
const doctor_repository_1 = require("./doctor.repository");
const shared_module_1 = require("../shared/shared.module");
let DoctorModule = class DoctorModule {
};
DoctorModule = __decorate([
    common_1.Module({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([doctor_repository_1.DoctorRepository]),
            passport_1.PassportModule.register({
                defaultStrategy: 'jwt',
            }),
            shared_module_1.SharedModule,
        ],
        controllers: [doctor_controller_1.DoctorController],
        providers: [doctor_service_1.DoctorService, password_encrypter_service_1.PasswordEncrypterService],
        exports: [doctor_service_1.DoctorService],
    })
], DoctorModule);
exports.DoctorModule = DoctorModule;
//# sourceMappingURL=doctor.module.js.map