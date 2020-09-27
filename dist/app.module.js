"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const ejs_adapter_1 = require("@nestjs-modules/mailer/dist/adapters/ejs.adapter");
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const message_service_1 = require("./configuration/message.service");
const typeorm_1 = require("@nestjs/typeorm");
const appointment_module_1 = require("./appointment/appointment.module");
const medication_module_1 = require("./medication/medication.module");
const department_module_1 = require("./department/department.module");
const doctor_module_1 = require("./doctor/doctor.module");
const shared_module_1 = require("./shared/shared.module");
const patient_module_1 = require("./patient/patient.module");
const authentication_module_1 = require("./authentication/authentication.module");
const schedule_1 = require("@nestjs/schedule");
const core_1 = require("@nestjs/core");
const exception_filter_1 = require("./configuration/exceptions/exception.filter");
const mailer_1 = require("@nestjs-modules/mailer");
const config_1 = require("./config");
const path_1 = require("path");
const path = path_1.join(__dirname, '../src/template/');
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            appointment_module_1.AppointmentModule,
            medication_module_1.MedicationModule,
            department_module_1.DepartmentModule,
            doctor_module_1.DoctorModule,
            shared_module_1.SharedModule,
            patient_module_1.PatientModule,
            authentication_module_1.AuthenticationModule,
            schedule_1.ScheduleModule.forRoot(),
            typeorm_1.TypeOrmModule.forRoot(),
            mailer_1.MailerModule.forRoot({
                transport: {
                    host: process.env.EMAIL_HOST,
                    port: process.env.EMAIL_PORT,
                    tls: {
                        ciphers: 'SSLv3',
                    },
                    secure: false,
                    auth: {
                        user: process.env.FROM_EMAIL,
                        pass: process.env.PASSWORD,
                    },
                },
                defaults: {
                    from: config_1.emailSettings.fromEmail,
                },
                template: {
                    dir: path,
                    adapter: new ejs_adapter_1.EjsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            {
                provide: core_1.APP_FILTER,
                useClass: exception_filter_1.AllExceptionsFilter,
            },
            app_service_1.AppService,
            message_service_1.MessageService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map