import { PasswordEncrypterService } from './../authentication/auth-configuration/password-encrypter.service';
import { PatientDto } from './dto/patient.dto';
import { QueryModel } from '../shared/model/query.model';
import { PatientService } from './patient.service';
import { Response } from 'express';
export declare class PatientController {
    private readonly patientService;
    private passwordEncrypterService;
    constructor(patientService: PatientService, passwordEncrypterService: PasswordEncrypterService);
    getPatients(res: Response, query: QueryModel): Promise<any>;
    getByPatientId(user: any, res: Response): Promise<any>;
    getById(id: string, res: Response): Promise<any>;
    update(id: string, patient: PatientDto, res: Response): Promise<any>;
    delete(id: string, res: Response): Promise<any>;
}
