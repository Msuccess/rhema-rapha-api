import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, Length } from 'class-validator';

export class RegisterDto {
  public readonly id: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email cannot be null' })
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'First name cannot be null' })
  public fullName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Phone number cannot be null' })
  public phonenumber: string;

  @ApiProperty()
  @Length(8)
  @IsNotEmpty({ message: 'Password cannot be null' })
  public password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Role cannot be null' })
  public role: string;

  @ApiProperty()
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
  public departmentId: string;

  @ApiProperty()
  public daysAvailable: string;

  @ApiProperty()
  public timesAvailable: string;
}
