import { DoctorModule } from './../doctor/doctor.module';
import { PatientModule } from './../patient/patient.module';
import { SharedModule } from './../shared/shared.module';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Module, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentRepository } from './appointment.repository';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationModule } from '../authentication/authentication.module';
import { AppointmentNotificationService } from './appointment-notification/appointment-notification.service';
import * as moment from 'moment';

@Module({
  imports: [
    TypeOrmModule.forFeature([AppointmentRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    AuthenticationModule,
    SharedModule,
    PatientModule,
    DoctorModule,
  ],
  controllers: [AppointmentController],
  providers: [
    AppointmentService,
    {
      provide: 'MomentWrapper',
      useFactory: async () => moment(),
      scope: Scope.REQUEST,
    },
    AppointmentNotificationService,
  ],
})
export class AppointmentModule {}
