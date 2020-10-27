import { PatientRepository } from './../patient/patient.repository';
import { DoctorRepository } from './../doctor/doctor.repository';
import { DepartmentRepository } from './../department/department.repository';
import { AppointmentRepository } from './../appointment/appointment.repository';
import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  imports: [
    TypeOrmModule.forFeature([AppointmentRepository]),
    TypeOrmModule.forFeature([DepartmentRepository]),
    TypeOrmModule.forFeature([DoctorRepository]),
    TypeOrmModule.forFeature([PatientRepository]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],
})
export class AnalyticsModule {}
