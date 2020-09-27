import { UserBaseEntity } from '../shared/user-base.entity';
import { DepartmentEntity } from '../department/department.entity';
import { AppointmentEntity } from '../appointment/appointment.entity';
export declare class DoctorEntity extends UserBaseEntity {
    address: string;
    daysAvailable: string;
    timesAvailable: string;
    department: DepartmentEntity;
    appointment: AppointmentEntity[];
    departmentId: string;
}
