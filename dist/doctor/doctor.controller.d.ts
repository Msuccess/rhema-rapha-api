import { PasswordEncrypterService } from './../authentication/auth-configuration/password-encrypter.service';
import { QueryModel } from '../shared/model/query.model';
import { Response } from 'express';
import { DoctorService } from './doctor.service';
import { DoctorDto } from './dto/doctor.dto';
export declare class DoctorController {
    private readonly doctorService;
    private passwordEncrypterService;
    constructor(doctorService: DoctorService, passwordEncrypterService: PasswordEncrypterService);
    getDoctors(res: Response, query: QueryModel): Promise<any>;
    getById(id: string, res: Response): Promise<any>;
    getDoctorsByDepartmentId(id: string, res: Response): Promise<any>;
    update(id: string, Doctor: DoctorDto, res: Response): Promise<any>;
    delete(id: string, res: Response): Promise<any>;
}
