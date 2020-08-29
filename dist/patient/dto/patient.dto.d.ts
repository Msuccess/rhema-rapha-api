import { UserRole } from '../../shared/user-base.entity';
export declare class PatientDto {
    readonly id: string;
    dateOfBirth: Date;
    address: string;
    bloodType: string;
    height: string;
    bloodPressure: string;
    email: string;
    fullName: string;
    phonenumber: string;
    password: string;
    role: UserRole;
    avatar: string;
}
