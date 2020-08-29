"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedModule = void 0;
const identity_user_service_1 = require("./../authentication/identity-user/identity-user.service");
const common_1 = require("@nestjs/common");
const identity_user_repository_1 = require("../authentication/identity-user/identity-user.repository");
const typeorm_1 = require("@nestjs/typeorm");
const notification_service_1 = require("./service/notification.service");
const email_service_1 = require("./service/email.service");
let SharedModule = class SharedModule {
};
SharedModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([identity_user_repository_1.IdentityUserRepository])],
        controllers: [],
        providers: [identity_user_service_1.IdentityUserService, notification_service_1.NotificationService, email_service_1.EmailService],
        exports: [identity_user_service_1.IdentityUserService, email_service_1.EmailService],
    })
], SharedModule);
exports.SharedModule = SharedModule;
//# sourceMappingURL=shared.module.js.map