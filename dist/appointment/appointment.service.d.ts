import { EmailService } from './../shared/service/email.service';
import { AppointmentRepository } from './appointment.repository';
import { QueryModel } from '../shared/model/query.model';
import { ResultException } from '../configuration/exceptions/result';
import { AppointmentDto } from './dto/appointment.dto';
export declare class AppointmentService {
    private readonly appointmentRepository;
    private readonly emailService;
    constructor(appointmentRepository: AppointmentRepository, emailService: EmailService);
    getByUserId(userId: string): Promise<any>;
    getAppointments(query: QueryModel): Promise<any>;
    getAppointment(id: string): Promise<any>;
    addAppointment(newAppointment: AppointmentDto): Promise<ResultException>;
    updateAppointment(id: string, newAppointment: AppointmentDto): Promise<import("typeorm").UpdateResult | ResultException>;
    cancelAppointment(id: string): Promise<import("typeorm").UpdateResult | ResultException>;
    deleteAppointment(id: string): Promise<import("typeorm").DeleteResult>;
    getAppointNotification(): Promise<ResultException>;
}
