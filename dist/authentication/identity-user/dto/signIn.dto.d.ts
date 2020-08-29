import { UserRole } from '../../../shared/user-base.entity';
export declare class SignInDto {
    password: string;
    email: string;
    role: UserRole;
}
