import { AppointmentMailDto } from './../../appointment/dto/appointment_mail.dto';
import { MailerService } from '@nestjs-modules/mailer';
export declare class EmailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    basicEmailSender(patient: AppointmentMailDto): void;
    emailSenderWithTemplate(patient: AppointmentMailDto): Promise<void>;
}
