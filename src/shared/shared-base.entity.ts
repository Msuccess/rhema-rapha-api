import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

export class SharedBaseEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ nullable: false, default:false })
  isDeleted:boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
