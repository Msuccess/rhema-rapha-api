import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class MedicationDto {
  public readonly id: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Medicine name cannot be null' })
  public readonly medicineName: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Dose cannot be null' })
  @IsNumber()
  public readonly dose: number;
  @ApiProperty()
  @IsNotEmpty({ message: 'Note cannot be null' })
  public readonly note: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Dose 0ne cannot be null' })
  public readonly dose0ne: Date;
  @ApiProperty()
  @IsDateString()
  public readonly doseTwo: Date;
  @ApiProperty()
  @IsDateString()
  public readonly doseThree: Date;
  @ApiProperty()
  @IsDateString()
  public readonly doseFour: Date;
  @ApiProperty()
  public readonly startDate: Date;
  @ApiProperty()
  public readonly endDate: Date;
  @ApiProperty()
  public readonly patientId: string;
}
