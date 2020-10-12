import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class AppointmentDto {
  public id: string;

  @ApiProperty()
  public  description: string;

  @ApiProperty()
  @IsDateString({ message: 'Date is not valid' })
  @IsNotEmpty({ message: 'Date is not provided' })
  public  date: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'Time is not provided' })
  @IsString()
  public  appointmentTime: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Type is not provided' })
  @IsString()
  public  type: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Appointment Day is not provided' })
  @IsString()
  public  appointmentDay: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Doctor Id is not provided' })
  public  doctorId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Patient Id is not provided' })
  public patientId: string;

  isCanceled:boolean;
}

export class AppointmentPatientDto {
  public  id: string;

  @ApiProperty()
  public  description: string;

  @ApiProperty()
  @IsDateString({ message: 'Date is not valid' })
  @IsNotEmpty({ message: 'Date is not provided' })
  public  date: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'Time is not provided' })
  @IsString()
  public  appointmentTime: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Type is not provided' })
  @IsString()
  public  type: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Appointment Day is not provided' })
  @IsString()
  public  appointmentDay: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Doctor Id is not provided' })
  public  doctorId: string;

  @ApiProperty()
  public patientId: string;

  isCanceled:boolean;
}
