import { SharedBaseEntity } from '../shared/shared-base.entity';
export declare class MedicationEntity extends SharedBaseEntity {
    medicineName: string;
    dose0ne: Date;
    doseTwo: Date;
    doseThree: Date;
    doseFour: Date;
    note: string;
    startDate: Date;
    endDate: Date;
}
