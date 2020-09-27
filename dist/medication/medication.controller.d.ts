import { Response } from 'express';
import { MedicationService } from './medication.service';
import { QueryModel } from '../shared/model/query.model';
import { MedicationDto } from './dto/medication.dto';
export declare class MedicationController {
    private readonly medicationService;
    constructor(medicationService: MedicationService);
    getMedications(res: Response, query: QueryModel): Promise<Response<any>>;
    getMedicationsByUserId(identityUserId: any, res: Response): Promise<Response<any>>;
    getById(id: string, res: Response): Promise<Response<any>>;
    create(patient: MedicationDto, res: Response): Promise<Response<any>>;
    update(id: string, patient: MedicationDto, res: Response): Promise<Response<any>>;
    delete(id: string, res: Response): Promise<Response<any>>;
}
