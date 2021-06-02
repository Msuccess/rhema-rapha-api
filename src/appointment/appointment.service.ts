import { AppointmentEntity } from './appointment.entity';
import { DoctorService } from './../doctor/doctor.service';
import { PatientService } from './../patient/patient.service';
import { AppointmentMailDto } from './dto/appointment_mail.dto';
import { EmailService } from './../shared/service/email.service';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentRepository } from './appointment.repository';
import { ResultException } from '../configuration/exceptions/result';
import { AppointmentDto } from './dto/appointment.dto';
import { CronExpression, Cron } from '@nestjs/schedule';
import { MoreThanOrEqual } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentRepository)
    private readonly appointmentRepository: AppointmentRepository,
    private readonly emailService: EmailService,
    private readonly patientService: PatientService,
    private readonly doctorService: DoctorService,
  ) {}

  private async checkAppointmentBooking(
    time: string,
    appointmentDate: Date,
    doctorId: string,
  ) {
    const dateTime = this.buildDateTimeObject(time, appointmentDate);
    const isPast = moment().isAfter(dateTime);

    if (isPast) {
      return new ResultException(
        'Appointment Time Invalid',
        HttpStatus.BAD_REQUEST,
      );
    }

    const booked = await this.appointmentRepository.find({
      where: {
        date: appointmentDate,
        appointmentTime: time.toString(),
        doctorId: doctorId,
      },
    });

    if (!booked || Object.keys(booked).length !== 0) {
      return new ResultException(
        'Date and Time Already Booked',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    return isPast;
  }

  private buildDateTimeObject(time: string, date: Date) {
    const d = moment(date)
      .format('YYYY-MM-DD')
      .split('-')
      .map(i => +i);
    let t = [];
    if (time.includes('PM')) {
      t = time
        .replace('PM', '')
        .trim()
        .split(':')
        .map(i => +i);
      t[0] = t[0] + 12;
    } else {
      t = time
        .replace('AM', '')
        .trim()
        .split(':')
        .map(i => +i);
    }

    const dt = new Date(d[0], d[1] - 1, d[2], t[0], t[1]);
    return dt;
  }

  public async getAppointmentByUser(user: any): Promise<any> {
    try {
      const patient = await this.patientService.getPatientByEmail(user.email);
      return await this.appointmentRepository
        .find({
          order: { date: 'DESC' },
          where: {
            isCanceled: false,
            patientId: patient.id,
            date: MoreThanOrEqual(new Date()),
          },
        })
        .catch(error => console.log('>>>>>>>>>>', error));
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAppointmentByDoctorId(user: any): Promise<any> {
    try {
      const doctor = await this.doctorService.getDoctorByEmail(user.email);

      return await this.appointmentRepository
        .find({
          order: { date: 'DESC' },
          where: {
            doctorId: doctor.id,
            date: MoreThanOrEqual(new Date()),
          },
        })
        .catch(error => console.log('>>>>>>>>>>', error));
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAppointments(): Promise<any> {
    try {
      const appointments = await this.appointmentRepository
        .find({
          order: { date: 'DESC' },
          where: { date: MoreThanOrEqual(new Date()) },
        })
        .catch(error => console.log('>>>>>>>>>>', error));
      return appointments;
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getDoctorAppointments(id: string): Promise<any> {
    try {
      return await this.appointmentRepository
        .find({
          order: { date: 'DESC' },
          where: {
            doctorId: id,
            date: MoreThanOrEqual(new Date()),
          },
        })
        .catch(error => console.log('>>>>>>>>>>', error));
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

  public async addAppointment(newAppointment: AppointmentDto) {
    try {
      const booked = await this.checkAppointmentBooking(
        newAppointment.appointmentTime,
        newAppointment.date,
        newAppointment.doctorId,
      );

      if (!booked) {
        newAppointment.dateStr = moment(newAppointment.date).format('LL');
        const appointment = await this.appointmentRepository.save(
          newAppointment,
        );

        if (!appointment || Object.keys(appointment).length !== 0) {
          const emailDetail = await this.getAppointment(appointment.id);
          this.addedAppointmentNotification(emailDetail);
        }
      }
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async addPatientAppointment(
    userId: string,
    newAppointment: AppointmentDto,
  ) {
    try {
      const booked = await this.checkAppointmentBooking(
        newAppointment.appointmentTime,
        newAppointment.date,
        newAppointment.doctorId,
      );

      if (!booked) {
        const patient = await this.patientService.getPatientUserId(userId);
        newAppointment.patientId = patient.id;

        newAppointment.dateStr = moment(newAppointment.date).format('LL');

        const appointment = await this.appointmentRepository.save(
          newAppointment,
        );

        if (!appointment || Object.keys(appointment).length !== 0) {
          const emailDetail = await this.getAppointment(appointment.id);
          this.addedAppointmentNotification(emailDetail);
        }
      }
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateAppointment(id: string, newAppointment: AppointmentDto) {
    try {
      const dbAppointment = await this.getAppointment(id);

      if (dbAppointment) {
        if (newAppointment.date !== null) {
          newAppointment.dateStr = moment(newAppointment.date).format('LL');
        }
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
        newAppointment.dateStr = dbAppointment.dateStr;
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

  @Cron(CronExpression.EVERY_5_HOURS)
  private async appointmentReminder() {
    try {
      const appointments = await this.appointmentRepository
        .find({
          where: {
            isCanceled: false,
          },
        })
        .catch(error => console.log('>>>>>>>>>>', error));

      if (appointments) {
        appointments.forEach(appointment => {
          const timeNow = moment();
          const appointmentTime = moment(appointment.date);
          const timeDifference = appointmentTime.diff(timeNow, 'hours');

          if (timeDifference === 7) {
            const appointmentMail = new AppointmentMailDto();
            appointmentMail.appointmentTime = appointment.appointmentTime;
            appointmentMail.date = appointment.date;
            appointmentMail.doctorFullName = appointment.doctor.fullName;
            appointmentMail.doctorPhoneNumber = appointment.doctor.phonenumber;
            appointmentMail.patientEmail = appointment.patient.email;
            appointmentMail.patientFullName = appointment.patient.fullName;

            this.emailService
              .appointmentReminderSendEmail(appointmentMail)
              .catch(error => console.log('>>>>>>>>>>', error));

            console.log('Email Sent', appointmentMail);
            return;
          }
        });
      }
      return;
    } catch (error) {
      console.log(error);
    }
  }

  // @Cron(CronExpression.EVERY_10_SECONDS)
  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  private async addedAppointmentNotification(appointment: AppointmentEntity) {
    try {
      const appointmentMail = new AppointmentMailDto();
      appointmentMail.appointmentTime = appointment.appointmentTime;
      appointmentMail.date = appointment.date;
      appointmentMail.doctorFullName = appointment.doctor.fullName;
      appointmentMail.doctorPhoneNumber = appointment.doctor.phonenumber;
      appointmentMail.patientEmail = appointment.patient.email;
      appointmentMail.patientFullName = appointment.patient.fullName;

      this.emailService.appointmentAddedNotifySendEmail(appointmentMail);

      console.log('Appointment', appointment);
      return;
    } catch (error) {
      throw new HttpException({ message: error }, HttpStatus.BAD_REQUEST);
    }
  }
}
