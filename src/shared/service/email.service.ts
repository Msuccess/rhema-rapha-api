import * as nodemailer from 'nodemailer';
import * as ejs from 'ejs';
import { AppointmentMailDto } from './../../appointment/dto/appointment_mail.dto';
import { emailSettings } from './../../config';
import { Injectable } from '@nestjs/common';
import { join } from 'path';
const path = join(__dirname, '../../../src/template/');
@Injectable()
export class EmailService {
  constructor() {}

  private async sendEmail(mailOptions: {
    from: string;
    to: string; // list of receivers (separated by ,)
    subject: string;
    text: string;
    html: any;
  }) {
    const transporter = nodemailer.createTransport({
      host: emailSettings.primaryDomain,
      port: emailSettings.primaryPort,
      secure: emailSettings.secure,
      auth: {
        user: emailSettings.fromEmail,
        pass: emailSettings.password,
      },
    });

    await new Promise<boolean>(async function(resolve, reject) {
      return await transporter.sendMail(
        mailOptions,
        async (error: any, info: { messageId: any }) => {
          if (error) {
            console.log('Message Error: %s', error);
            return reject(false);
          }
          console.log('Message sent: %s', info.messageId);
          resolve(true);
        },
      );
    }).catch(error => console.log('>>>>>>>>>>', error));
  }

  public async basicEmailSender(patient: AppointmentMailDto): Promise<void> {
    const mailOptions = {
      to: patient.patientEmail, // List of receivers email address
      from: emailSettings.fromEmail, // Senders email address
      subject: 'Rhema Rapha Appointment Notification ✔', // Subject line
      text: 'welcome', // plaintext body
      html: '<b>welcome</b>', // HTML body content
    };

    await this.sendEmail(mailOptions).catch((error: any) =>
      console.log('>>>>>>>>>>', error),
    );
  }

  public async appointmentAddedNotifySendEmail(patient: AppointmentMailDto) {
    const data = await ejs
      .renderFile(path + 'notify.ejs', {
        appointment_detail: patient,
      })
      .catch((error: any) => console.log('>>>>>>>>>>', error));

    const mailOptions = {
      from: emailSettings.fromEmail,
      to: patient.patientEmail, // list of receivers (separated by ,)
      subject: 'Appointment Notification',
      text: 'Appointment Notification',
      html: data, // html body
    };

    await this.sendEmail(mailOptions).catch((error: any) =>
      console.log('>>>>>>>>>>', error),
    );
  }

  public async appointmentReminderSendEmail(patient: AppointmentMailDto) {
    const data = await ejs
      .renderFile(path + 'reminder.ejs', {
        appointment_detail: patient,
      })
      .catch((error: any) => console.log('>>>>>>>>>>', error));

    const mailOptions = {
      from: emailSettings.fromEmail,
      to: patient.patientEmail, // list of receivers (separated by ,)
      subject: 'Appointment Reminder',
      text: 'Appointment Reminder',
      html: data, // html body
    };

    await this.sendEmail(mailOptions).catch((error: any) =>
      console.log('>>>>>>>>>>', error),
    );
  }

  public async sendForgottenEmail(email: string) {
    const mailOptions = {
      from: emailSettings.fromEmail,
      to: email, // list of receivers (separated by ,)
      subject: 'Verify Email',
      text: 'Verify Email',
      html:
        'Hi! <br><br> Thanks for your registration<br><br>' +
        '<a href=' +
        'localhost' +
        ':' +
        3000 +
        '/auth/email/verify/' +
        '' +
        '>Click here to activate your account</a>', // html body
    };

    await this.sendEmail(mailOptions).catch((error: any) =>
      console.log('>>>>>>>>>>', error),
    );
  }
}
