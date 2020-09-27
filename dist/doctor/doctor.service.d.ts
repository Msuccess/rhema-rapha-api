import { DoctorRepository } from './doctor.repository';
import { QueryModel } from '../shared/model/query.model';
import { ResultException } from '../configuration/exceptions/result';
import { DoctorDto } from './dto/doctor.dto';
import { GetDoctorDto } from './dto/getdoctor.dto';
import { IdentityUserService } from '../authentication/identity-user/identity-user.service';
export declare class DoctorService {
    private readonly doctorRepository;
    private readonly identityUserService;
    constructor(doctorRepository: DoctorRepository, identityUserService: IdentityUserService);
    getDoctors(query: QueryModel): Promise<any>;
    getByDepartmentId(id: string): Promise<any>;
    getDoctor(id: string): Promise<GetDoctorDto>;
    getDoctorByEmail(email: string): Promise<DoctorDto>;
    addDoctor(newDoctor: DoctorDto): Promise<ResultException>;
    updateDoctor(id: string, newDoctor: DoctorDto): Promise<import("typeorm").UpdateResult | ResultException>;
    deleteDoctor(id: string): Promise<import("typeorm").DeleteResult>;
}
