import { PatientService } from './../patient/patient.service';
import { AppointmentMailDto } from './dto/appointment_mail.dto';
import { EmailService } from './../shared/service/email.service';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentRepository } from './appointment.repository';
import { QueryModel } from '../shared/model/query.model';
import { ResultException } from '../configuration/exceptions/result';
import { AppointmentDto } from './dto/appointment.dto';
import { CronExpression, Cron } from '@nestjs/schedule';
import { Raw } from 'typeorm';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentRepository)
    private readonly appointmentRepository: AppointmentRepository,
    private readonly emailService: EmailService,
    private readonly patientService: PatientService,
  ) {}

  public async getAppointmentByUser(user: any): Promise<any> {
    try {
      const patient = await this.patientService.getPatientByEmail(user.email);

      return await this.appointmentRepository.find({
        where: {
          patientId: patient.id,
          isCanceled: false,
        },
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAppointments(query: QueryModel): Promise<any> {
    try {
      return await this.appointmentRepository.find({
        take: query.pageSize,
        skip: query.pageSize * (query.page - 1),
        order: { createdAt: 'DESC' },
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getDoctorAppointment(id: string): Promise<any> {
    try {
      return await this.appointmentRepository.find({
        where: { doctorId: id },
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAppointment(id: string): Promise<any> {
    try {
      return await this.appointmentRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async addAppointment(newAppointment: AppointmentDto, user: any) {
    try {
      const patient = await this.patientService.getPatientByEmail(user.email);
      newAppointment.patientId = patient.id;

      return await this.appointmentRepository.save(newAppointment);
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async addPatientAppointment(
    userId: string,
    newAppointment: AppointmentDto,
  ) {
    try {
      const patient = await this.patientService.getPatientUserId(userId);
      newAppointment.patientId = patient.id;

      return await this.appointmentRepository.save(newAppointment);
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateAppointment(id: string, newAppointment: AppointmentDto) {
    try {
      const dbAppointment = this.getAppointment(id);
      if (dbAppointment) {
        return await this.appointmentRepository.update(id, newAppointment);
      } else {
        return new ResultException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async cancelAppointment(id: string) {
    try {
      const dbAppointment: AppointmentDto = await this.getAppointment(id);
      if (dbAppointment) {
        const newAppointment = new AppointmentDto();
        newAppointment.appointmentDay = dbAppointment.appointmentDay;
        newAppointment.appointmentTime = dbAppointment.appointmentTime;
        newAppointment.date = dbAppointment.date;
        newAppointment.description = dbAppointment.description;
        newAppointment.doctorId = dbAppointment.doctorId;
        newAppointment.patientId = dbAppointment.patientId;
        newAppointment.type = dbAppointment.type;
        newAppointment.isCanceled = true;

        return await this.appointmentRepository.update(id, newAppointment);
      } else {
        return new ResultException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteAppointment(id: string) {
    try {
      return await this.appointmentRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  // @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  public async getAppointNotification() {
    try {
      const yesterday = "NOW() - INTERVAL '1 DAY'";
      const appointments = await this.appointmentRepository.find({
        where: {
          date: Raw(alias => `${alias} = ${yesterday}`),
          isCanceled: false,
          // date: Raw(alias => `${alias} < NOW()`),
        },
      });

      appointments.forEach(appointment => {
        const appointmentMail = new AppointmentMailDto();
        appointmentMail.appointmentTime = appointment.appointmentTime;
        appointmentMail.date = appointment.date;
        appointmentMail.doctorFullName = appointment.doctor.fullName;
        appointmentMail.doctorPhoneNumber = appointment.doctor.phonenumber;
        appointmentMail.patientEmail = appointment.patient.email;
        appointmentMail.patientFullName = appointment.patient.fullName;

        this.emailService.appointmentAddedNotifySendEmail(appointmentMail);
      });

      console.log('Appointment', appointments);
      return;
    } catch (error) {
      return new ResultException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
