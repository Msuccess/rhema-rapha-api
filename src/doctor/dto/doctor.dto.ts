import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { UserRole } from '../../common/entity/user-base.entity';

export class DoctorDto {
  public readonly id: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email cannot be null' })
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'First name cannot be null' })
  public fullName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Phonenumber cannot be null' })
  public phonenumber: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Department cannot be null' })
  public departmentId: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Days Available cannot be null' })
  public daysAvailable: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Days Available cannot be null' })
  public timesAvailable: string;
  @ApiProperty()
  public address: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Password cannot be null' })
  public password: string;

  isDeleted: boolean;
  userId: string;

  public role: UserRole;
}
