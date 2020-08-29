import { UserRole } from '../../shared/user-base.entity';
export declare class DoctorDto {
    readonly id: string;
    email: string;
    fullName: string;
    phonenumber: string;
    departmentId: string;
    daysAvailable: string;
    timesAvailable: string;
    address: string;
    password: string;
    role: UserRole;
    avatar: string;
}
