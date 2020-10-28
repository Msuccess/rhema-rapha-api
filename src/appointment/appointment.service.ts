import { AppointmentEntity } from './appointment.entity';
import { DoctorService } from './../doctor/doctor.service';
import { PatientService } from './../patient/patient.service';
import { AppointmentMailDto } from './dto/appointment_mail.dto';
import { EmailService } from './../shared/service/email.service';
import { Injectable, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentRepository } from './appointment.repository';
import { QueryModel } from '../shared/model/query.model';
import { ResultException } from '../configuration/exceptions/result';
import { AppointmentDto } from './dto/appointment.dto';
import { CronExpression, Cron } from '@nestjs/schedule';
import { MoreThanOrEqual, Raw } from 'typeorm';
import * as moment from 'moment';

@Injectable()
export class AppointmentService {
  constructor(
    @Inject('MomentWrapper') private momentWrapper: moment.Moment,
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

    const dateString = moment(appointmentDate).format('LL');
    const booked = await this.appointmentRepository.find({
      order: { date: 'DESC' },
      where: {
        dateStr: dateString,
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
      const today = moment().format('LL');

      const r = await this.appointmentRepository.find({
        order: { date: 'DESC' },
        where: {
          isCanceled: false,
          patientId: patient.id,
          dateStr: MoreThanOrEqual(today),
        },
      });

      return r;
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAppointmentByDoctorId(user: any): Promise<any> {
    try {
      const doctor = await this.doctorService.getDoctorByEmail(user.email);

      const today = moment().format('LL');

      return await this.appointmentRepository.find({
        order: { date: 'DESC' },
        where: {
          doctorId: doctor.id,
          dateStr: MoreThanOrEqual(today),
        },
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAppointments(query: QueryModel): Promise<any> {
    try {
      const today = moment().format('LL');
      const time = moment().format('LT');

      const r = await this.appointmentRepository.find({
        take: query.pageSize,
        skip: query.pageSize * (query.page - 1),
        order: { date: 'DESC' },
        where: {
          date: MoreThanOrEqual(today),
          appointmentTime: MoreThanOrEqual(time),
        },
      });

      return r;
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getDoctorAppointments(id: string): Promise<any> {
    try {
      const today = moment().format('LL');
      const time = moment().format('LT');

      return await this.appointmentRepository.find({
        order: { date: 'DESC' },
        where: {
          doctorId: id,
          dateStr: MoreThanOrEqual(today),
          appointmentTime: MoreThanOrEqual(time),
        },
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
          this.appointmentBookingNotification(emailDetail);
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
          this.appointmentBookingNotification(emailDetail);
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

  // @Cron(CronExpression.EVERY_10_SECONDS)
  @Cron(CronExpression.EVERY_12_HOURS)
  public async getAppointNotification() {
    try {
      const yesterday = 'NOW() - INTERVAL 12 HOUR';
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

        this.emailService.emailSenderWithTemplate(appointmentMail);
      });

      console.log('Appointment', appointments);
      return;
    } catch (error) {
      return new ResultException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  private async appointmentBookingNotification(appointment: AppointmentEntity) {
    try {
      const appointmentMail = new AppointmentMailDto();
      appointmentMail.appointmentTime = appointment.appointmentTime;
      appointmentMail.date = appointment.date;
      appointmentMail.doctorFullName = appointment.doctor.fullName;
      appointmentMail.doctorPhoneNumber = appointment.doctor.phonenumber;
      appointmentMail.patientEmail = appointment.patient.email;
      appointmentMail.patientFullName = appointment.patient.fullName;

      this.emailService.appointmentNotificationEmailTemplate(appointmentMail);

      console.log('Appointment', appointment);
      return;
    } catch (error) {
      return new ResultException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
