"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationModule = void 0;
const common_1 = require("@nestjs/common");
const authentication_service_1 = require("./authentication.service");
const password_encrypter_service_1 = require("./auth-configuration/password-encrypter.service");
const identity_user_controller_1 = require("./identity-user/identity-user.controller");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("../configuration/config");
const jwt_strategy_1 = require("./auth-configuration/jwt.strategy");
const google_strategy_1 = require("./auth-configuration/google.strategy");
const patient_module_1 = require("../patient/patient.module");
const doctor_module_1 = require("../doctor/doctor.module");
const shared_module_1 = require("../shared/shared.module");
let AuthenticationModule = class AuthenticationModule {
};
AuthenticationModule = __decorate([
    common_1.Module({
        imports: [
            patient_module_1.PatientModule,
            doctor_module_1.DoctorModule,
            passport_1.PassportModule.register({
                defaultStrategy: 'jwt',
            }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET || config_1.SECRET,
                signOptions: { expiresIn: config_1.EXPIRESIN },
            }),
            shared_module_1.SharedModule,
        ],
        controllers: [identity_user_controller_1.IdentityUserController],
        providers: [
            authentication_service_1.AuthenticationService,
            password_encrypter_service_1.PasswordEncrypterService,
            jwt_strategy_1.JwtStrategy,
            google_strategy_1.GoogleStrategy,
        ],
        exports: [passport_1.PassportModule, authentication_service_1.AuthenticationService, password_encrypter_service_1.PasswordEncrypterService],
    })
], AuthenticationModule);
exports.AuthenticationModule = AuthenticationModule;
//# sourceMappingURL=authentication.module.js.map