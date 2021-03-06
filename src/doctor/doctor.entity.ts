import { UserBaseEntity } from '../common/entity/user-base.entity';
import { Column, Entity, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { DepartmentEntity } from '../department/department.entity';
import { AppointmentEntity } from '../appointment/appointment.entity';

@Entity({ name: 'DoctorTbl' })
export class DoctorEntity extends UserBaseEntity {
  @Column({ type: 'varchar', nullable: true, length: '100' })
  address: string;

  @Column({ type: 'varchar', nullable: false })
  daysAvailable: string;

  @Column({ type: 'varchar', nullable: false })
  timesAvailable: string;

  @ManyToOne(
    () => DepartmentEntity,
    department => department.doctor,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'departmentId' })
  department: DepartmentEntity;

  @OneToMany(
    () => AppointmentEntity,
    appointment => appointment.doctor,
    { onDelete: 'CASCADE' },
  )
  appointment: AppointmentEntity[];

  @Column()
  departmentId: string;
}
