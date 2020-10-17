import { UserRole } from '../../shared/user-base.entity';
import { Entity, BaseEntity, Column, CreateDateColumn, PrimaryGeneratedColumn, 
    UpdateDateColumn } from 'typeorm';

@Entity({ name: 'IdentityUserTbl' })
export class IdentityUserEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
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
