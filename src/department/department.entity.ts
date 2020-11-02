import { Column, Entity, OneToMany } from 'typeorm';
import { SharedBaseEntity } from '../common/entity/shared-base.entity';
import { DoctorEntity } from '../doctor/doctor.entity';

@Entity({ name: 'DepartmentTbl' })
export class DepartmentEntity extends SharedBaseEntity {
  @Column({ type: 'varchar', nullable: false, length: '100' })
  name: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @OneToMany(
    () => DoctorEntity,
    doctor => doctor.department,
    { cascade: true, eager: true, onDelete: 'CASCADE' },
  )
  doctor: DoctorEntity[];
}
