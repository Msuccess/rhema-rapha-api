import { UserBaseEntity } from '../shared/user-base.entity';
import { AppointmentEntity } from '../appointment/appointment.entity';
export declare class PatientEntity extends UserBaseEntity {
    dateOfBirth: Date;
    address: string;
    bloodType: string;
    height: string;
    bloodPressure: string;
    appointment: AppointmentEntity[];
}
