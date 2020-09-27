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
exports.EmailService = void 0;
const ejs = require("ejs");
const config_1 = require("./../../config");
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const path_1 = require("path");
const path = path_1.join(__dirname, '../../../src/template/');
let EmailService = class EmailService {
    constructor(mailerService) {
        this.mailerService = mailerService;
    }
    basicEmailSender(patient) {
        this.mailerService
            .sendMail({
            to: patient.patientEmail,
            from: config_1.emailSettings.fromEmail,
            subject: 'Rhema Rapha Appointment Notification ✔',
            text: 'welcome',
            html: '<b>welcome</b>',
        })
            .then((success) => {
            console.log(success);
        })
            .catch((err) => {
            console.log(err);
        });
    }
    async emailSenderWithTemplate(patient) {
        try {
            const data = await ejs.renderFile(path + 'index.ejs', {
                appointment_detail: patient,
            });
            const result = await this.mailerService.sendMail({
                to: patient.patientEmail,
                from: config_1.emailSettings.fromEmail,
                subject: 'Appointment Notification',
                html: data,
            });
            console.log(result);
        }
        catch (error) {
            console.log(error);
        }
    }
};
EmailService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], EmailService);
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map