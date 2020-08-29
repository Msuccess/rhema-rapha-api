import { UserRole } from '../../../shared/user-base.entity';
export declare class IdentityUserDto {
    id: string;
    email: string;
    fullName: string;
    phonenumber: string;
    password: string;
    avatar: string;
    role: UserRole;
}
