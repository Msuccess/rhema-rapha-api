import { bool, boolean } from 'joi';
import {
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from 'typeorm';

export enum UserRole {
  DOCTOR = 'doctor',
  PATIENT = 'patient',
  USER = 'user',
  ADMIN = 'admin',
}

export class UserBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, default:false })
  isDeleted:boolean;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  userId: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
    length: '100',
  })
  email: string;

  @Column({ type: 'varchar', nullable: false, length: '500' })
  fullName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    length: '15',
    unique: true,
  })
  phonenumber: string;

  @Column({ type: 'varchar', nullable: false, length: '100' })
  password: string;

  @Column({ type: 'varchar', nullable: false, length: '20' })
  role: UserRole;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
