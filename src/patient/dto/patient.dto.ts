import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsDateString, IsString } from 'class-validator';
import { UserRole } from '../../shared/user-base.entity';

export class PatientDto {
  public readonly id: string;
  
  @ApiProperty()
  @IsNotEmpty({ message: 'Date of Birth must be provided' })
  public dateOfBirth: Date;

  @ApiProperty()
  public address: string;

  @ApiProperty()
  public bloodType: string;

  @ApiProperty()
  public height: string;

  @ApiProperty()
  public bloodPressure: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty({ message: 'Email must be provided' })
  public email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'User name must be provided' })
  public fullName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Phone number must be provided' })
  public phonenumber: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password must be provided' })
  public password: string;

  @ApiProperty()
  gender: string;

  userId: string;

  public role: UserRole;
}
