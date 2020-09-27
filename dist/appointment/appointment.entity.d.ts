import { DoctorEntity } from './../doctor/doctor.entity';
import { PatientEntity } from './../patient/patient.entity';
import { SharedBaseEntity } from '../shared/shared-base.entity';
export declare class AppointmentEntity extends SharedBaseEntity {
    description: string;
    date: Date;
    appointmentTime: string;
    appointmentDay: string;
    type: string;
    isCanceled: boolean;
    doctor: DoctorEntity;
    patient: PatientEntity;
    doctorId: string;
    patientId: string;
}
