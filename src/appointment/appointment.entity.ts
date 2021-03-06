import { DoctorEntity } from './../doctor/doctor.entity';
import { PatientEntity } from './../patient/patient.entity';
import { SharedBaseEntity } from '../common/entity/shared-base.entity';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'AppointmentTbl' })
export class AppointmentEntity extends SharedBaseEntity {
  @Column({ type: 'varchar', nullable: true, length: '200' })
  description: string;

  @Column({ type: Date, nullable: false })
  date: Date;

  @Column({ type: 'varchar', nullable: true })
  dateStr: string;

  @Column({ type: 'varchar', nullable: false })
  appointmentTime: string;

  @Column({ type: 'varchar', nullable: false })
  appointmentDay: string;

  @Column({ type: 'varchar', nullable: false, length: '100' })
  type: string;

  @Column({ type: 'bool', default: false })
  isCanceled: boolean;

  @Column({ type: 'varchar', default: 'Active', nullable: true })
  status: string;

  @ManyToOne(
    () => DoctorEntity,
    doctor => doctor.appointment,
    { eager: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'doctorId' })
  doctor: DoctorEntity;

  @ManyToOne(
    () => PatientEntity,
    patient => patient.appointment,
    { eager: true, onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'patientId' })
  patient: PatientEntity;

  @Column()
  doctorId: string;

  @Column()
  patientId: string;
}
