import { Roles } from './../authentication/auth-guard/role.decorator';
import { RoleGuard } from './../authentication/auth-guard/role.guard';
import { Controller, Get, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { AnalyticsService } from './analytics.service';

@ApiTags('analytics')
@UseGuards(AuthGuard(), RoleGuard)
@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('graph')
  @Roles('admin')
  public async getAppointments(@Res() res: Response) {
    const response = await this.analyticsService.getDepartmentsAndDoctor();
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Department And Doctor Data', data: response });
  }

  @Get('doctor_number')
  @Roles('admin')
  public async getDoctorNumber(@Res() res: Response) {
    const response = await this.analyticsService.getNumberOfDoctors();
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Number of Doctors', data: response });
  }

  @Get('patient_number')
  @Roles('admin')
  public async getPatientNumber(@Res() res: Response) {
    const response = await this.analyticsService.getNumberOfPatients();
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Number of Patient', data: response });
  }

  @Get('appointment_number')
  @Roles('admin')
  public async getAppointmentNumber(@Res() res: Response) {
    const response = await this.analyticsService.getNumberOfAppointments();
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Number of Patient', data: response });
  }

  @Get('department_number')
  @Roles('admin')
  public async getDepartmentNumber(@Res() res: Response) {
    const response = await this.analyticsService.getNumberOfDepartments();
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Number of Patient', data: response });
  }

  @Get('new_doctors')
  @Roles('admin')
  public async getRecentDoctors(@Res() res: Response) {
    const response = await this.analyticsService.getNewDoctors();
    return res
      .status(HttpStatus.OK)
      .json({ message: 'New Doctor', data: response });
  }

  @Get('recent_appointment')
  @Roles('admin', 'doctor')
  public async getRecentAppointment(@Res() res: Response) {
    const response = await this.analyticsService.getRecentAppointments();
    return res
      .status(HttpStatus.OK)
      .json({ message: 'New Appointment', data: response });
  }

  @Get('new_patient')
  @Roles('admin')
  public async getNewPatients(@Res() res: Response) {
    const response = await this.analyticsService.getNewPatients();
    return res
      .status(HttpStatus.OK)
      .json({ message: 'New Patient', data: response });
  }
}
