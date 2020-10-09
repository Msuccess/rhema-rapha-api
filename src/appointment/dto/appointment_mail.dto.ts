import { ApiProperty } from '@nestjs/swagger';

export class AppointmentMailDto {
  @ApiProperty()
  public date: Date;
  @ApiProperty()
  public appointmentTime: string;
  @ApiProperty()
  public doctorEmail: string;
  @ApiProperty()
  public patientEmail: string;
  @ApiProperty()
  public patientFullName: string;
  @ApiProperty()
  public doctorFullName: string;
  @ApiProperty()
  public doctorPhoneNumber: string;
}
