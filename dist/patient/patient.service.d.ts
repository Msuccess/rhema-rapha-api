import { PatientRepository } from './patient.repository';
import { QueryModel } from '../shared/model/query.model';
import { ResultException } from '../configuration/exceptions/result';
import { PatientDto } from './dto/patient.dto';
export declare class PatientService {
    private readonly patientRepository;
    constructor(patientRepository: PatientRepository);
    getPatients(query: QueryModel): Promise<import("./patient.entity").PatientEntity[]>;
    getPatient(id: string): Promise<import("./patient.entity").PatientEntity>;
    getPatientByEmail(email: string): Promise<PatientDto>;
    addPatient(newPatient: PatientDto): Promise<PatientDto & import("./patient.entity").PatientEntity>;
    updatePatient(id: string, newPatient: PatientDto): Promise<import("typeorm").UpdateResult | ResultException>;
    deletePatient(id: string): Promise<import("typeorm").DeleteResult>;
}
