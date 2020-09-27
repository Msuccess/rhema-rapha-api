import { UserRole } from '../../shared/user-base.entity';
export declare class GetDoctorDto {
    readonly id: string;
    readonly email: string;
    readonly fullName: string;
    readonly phonenumber: string;
    readonly departmentId: string;
    readonly daysAvailable: string;
    readonly timesAvailable: string;
    readonly address: string;
    readonly role: UserRole;
    readonly avatar: string;
}
