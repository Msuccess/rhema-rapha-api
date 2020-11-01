import { IdentityUserDto } from './../authentication/identity-user/dto/identity-user.dto';
import { Response } from 'express';
import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentDto, AppointmentPatientDto } from './dto/appointment.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../common/guards/role.guard';
import { Roles } from '../common/decorators/role.decorator';
import { User } from '../common/decorators/current-user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { DatePipe } from 'src/common/pipes/date.pipe';

@ApiTags('Appointment')
@Controller('appointment')
@UseGuards(AuthGuard(), RoleGuard)
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get('/all')
  @Roles('admin')
  public async getAppointments(@Res() res: Response) {
    const response = await this.appointmentService.getAppointments();
    return res
      .status(HttpStatus.OK)
      .json({ message: 'All Appointments data', data: response });
  }

  @Get()
  @Roles('admin', 'doctor', 'patient')
  public async getAppointmentsByPatientId(
    @User() user: any,
    @Res() res: Response,
  ) {
    const response = await this.appointmentService.getAppointmentByUser(user);

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Patient Appointments data', data: response });
  }

  @Get('doctor')
  @Roles('admin', 'doctor')
  public async getAppointmentByDoctorId(
    @User() user: any,
    @Res() res: Response,
  ) {
    const response = await this.appointmentService.getAppointmentByDoctorId(
      user,
    );

    return res
      .status(HttpStatus.OK)
      .json({ message: 'Doctor Appointments data', data: response });
  }

  @Get('/:id')
  @Roles('admin', 'doctor', 'patient')
  public async getById(@Param('id') id: string, @Res() res: Response) {
    const response = await this.appointmentService.getAppointment(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Appointment Data', data: response });
  }

  @Post()
  @Roles('admin', 'doctor', 'patient')
  @UsePipes(ValidationPipe, DatePipe)
  public async create(
    @Body() appointment: AppointmentDto,
    @Res() res: Response,
  ) {
    const response = await this.appointmentService.addAppointment(appointment);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Appointment Created', data: response });
  }

  @Post('patient')
  @Roles('patient')
  @UsePipes(ValidationPipe)
  public async createPatientAppointment(
    @Body() appointment: AppointmentPatientDto,
    @Res() res: Response,
    @User() user: IdentityUserDto,
  ) {
    const response = await this.appointmentService.addPatientAppointment(
      user.id,
      appointment,
    );

    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Appointment Created', data: response });
  }

  @Put('/:id')
  @Roles('admin', 'doctor', 'patient')
  public async update(
    @Param('id') id: string,
    @Body() appointment: AppointmentDto,
    @Res() res: Response,
  ) {
    const response = await this.appointmentService.updateAppointment(
      id,
      appointment,
    );
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Appointment updated', data: response });
  }

  @Put('cancel/:id')
  @Roles('admin', 'doctor', 'patient')
  public async cancel(@Param('id') id: string, @Res() res: Response) {
    const response = await this.appointmentService.cancelAppointment(id);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Appointment updated', data: response });
  }

  @Delete('/:id')
  @Roles('admin', 'doctor', 'patient')
  public async delete(@Param('id') id: string, @Res() res: Response) {
    const response = await this.appointmentService.deleteAppointment(id);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Appointment deleted', data: response });
  }
}
