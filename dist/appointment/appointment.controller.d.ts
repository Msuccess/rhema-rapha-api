import { IdentityUserDto } from './../authentication/identity-user/dto/identity-user.dto';
import { Response } from 'express';
import { AppointmentService } from './appointment.service';
import { AppointmentDto, AppointmentPatientDto } from './dto/appointment.dto';
import { QueryModel } from '../shared/model/query.model';
export declare class AppointmentController {
    private readonly appointmentService;
    constructor(appointmentService: AppointmentService);
    getAppointments(res: Response, query: QueryModel): Promise<Response<any>>;
    getAppointmentsByUserId(userId: any, res: Response): Promise<Response<any>>;
    getAppointmentByDoctorId(): Promise<void>;
    getById(id: string, res: Response): Promise<Response<any>>;
    create(appointment: AppointmentDto, res: Response): Promise<Response<any>>;
    createPatientAppointment(appointment: AppointmentPatientDto, res: Response, user: IdentityUserDto): Promise<Response<any>>;
    update(id: string, appointment: AppointmentDto, res: Response): Promise<Response<any>>;
    cancel(id: string, res: Response): Promise<Response<any>>;
    delete(id: string, res: Response): Promise<Response<any>>;
}
