import { UserRole } from 'src/shared/user-base.entity';
export declare class GetUserDto {
    readonly id: string;
    readonly email: string;
    readonly fullName: string;
    readonly phonenumber: string;
    readonly avatar: string;
    readonly role: UserRole;
}
