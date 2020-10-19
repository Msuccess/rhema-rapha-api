import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageService } from './configuration/message.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentModule } from './appointment/appointment.module';
import { MedicationModule } from './medication/medication.module';
import { DepartmentModule } from './department/department.module';
import { DoctorModule } from './doctor/doctor.module';
import { SharedModule } from './shared/shared.module';
import { PatientModule } from './patient/patient.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { ScheduleModule } from '@nestjs/schedule';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './configuration/exceptions/exception.filter';
import { MailerModule } from '@nestjs-modules/mailer';
import { emailSettings } from './config';
import { join } from 'path';
const path = join(__dirname, '../src/template/');

@Module({
  imports: [
    AppointmentModule,
    MedicationModule,
    DepartmentModule,
    DoctorModule,
    SharedModule,
    PatientModule,
    AuthenticationModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot(),
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        port: "587",
        tls: {
          ciphers: 'SSLv3',
        },
        secure: false, // true for 465, false for other ports
        auth: {
          user: "rhemaraphaapp@gmail.com", // generated ethereal user
          pass: "rhemaApp20", // generated ethereal password
        },
      },
      defaults: {
        from: emailSettings.fromEmail,
      },
      template: {
        dir: path,
        adapter: new EjsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    AppService,
    MessageService,
  ],
})
export class AppModule {}
