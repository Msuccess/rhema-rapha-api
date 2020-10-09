import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class AppointmentDto {
  public readonly id: string;

  @ApiProperty()
  public readonly description: string;

  @ApiProperty()
  @IsDateString({ message: 'Date is not valid' })
  @IsNotEmpty({ message: 'Date is not provided' })
  public readonly date: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'Time is not provided' })
  @IsString()
  public readonly appointmentTime: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Type is not provided' })
  @IsString()
  public readonly type: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Appointment Day is not provided' })
  @IsString()
  public readonly appointmentDay: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Doctor Id is not provided' })
  public readonly doctorId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Patient Id is not provided' })
  public patientId: string;
  isCanceled = false;
}

export class AppointmentPatientDto {
  public readonly id: string;

  @ApiProperty()
  public readonly description: string;

  @ApiProperty()
  @IsDateString({ message: 'Date is not valid' })
  @IsNotEmpty({ message: 'Date is not provided' })
  public readonly date: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'Time is not provided' })
  @IsString()
  public readonly appointmentTime: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Type is not provided' })
  @IsString()
  public readonly type: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Appointment Day is not provided' })
  @IsString()
  public readonly appointmentDay: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Doctor Id is not provided' })
  public readonly doctorId: string;

  @ApiProperty()
  public patientId: string;

  isCanceled = false;
}
