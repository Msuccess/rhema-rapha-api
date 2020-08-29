import { SharedBaseEntity } from '../shared/shared-base.entity';
import { DoctorEntity } from '../doctor/doctor.entity';
export declare class DepartmentEntity extends SharedBaseEntity {
    name: string;
    description: string;
    doctor: DoctorEntity[];
}
