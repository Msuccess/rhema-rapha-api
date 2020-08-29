import { BaseEntity } from 'typeorm';
export declare enum UserRole {
    DOCTOR = "doctor",
    PATIENT = "patient",
    USER = "user",
    ADMIN = "admin"
}
export declare class UserBaseEntity extends BaseEntity {
    id: string;
    email: string;
    fullName: string;
    phonenumber: string;
    password: string;
    role: UserRole;
    avatar: string;
    createdAt: string;
    updatedAt: string;
}
