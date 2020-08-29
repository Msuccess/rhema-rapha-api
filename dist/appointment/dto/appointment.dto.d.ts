export declare class AppointmentDto {
    readonly id: string;
    readonly description: string;
    readonly date: Date;
    readonly appointmentTime: string;
    readonly type: string;
    readonly appointmentDay: string;
    readonly doctorId: string;
    patientId: string;
    isCanceled: boolean;
}
export declare class AppointmentPatientDto {
    readonly id: string;
    readonly description: string;
    readonly date: Date;
    readonly appointmentTime: string;
    readonly type: string;
    readonly appointmentDay: string;
    readonly doctorId: string;
    patientId: string;
    isCanceled: boolean;
}
