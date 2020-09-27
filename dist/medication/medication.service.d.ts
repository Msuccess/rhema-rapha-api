import { MedicationRepository } from './medication.repository';
import { QueryModel } from '../shared/model/query.model';
import { ResultException } from '../configuration/exceptions/result';
import { MedicationDto } from './dto/medication.dto';
export declare class MedicationService {
    private readonly medicationRepository;
    constructor(medicationRepository: MedicationRepository);
    getMedications(query: QueryModel): Promise<import("./medication.entity").MedicationEntity[]>;
    getMedicationsByUserId(userId: string): Promise<import("./medication.entity").MedicationEntity[]>;
    getMedication(id: string): Promise<import("./medication.entity").MedicationEntity>;
    addMedication(newMedication: MedicationDto): Promise<ResultException>;
    updateMedication(id: string, newMedication: MedicationDto): Promise<import("typeorm").UpdateResult | ResultException>;
    deleteMedication(id: string): Promise<import("typeorm").DeleteResult>;
}
