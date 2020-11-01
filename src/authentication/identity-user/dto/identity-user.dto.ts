import { UserRole } from '../../../common/entity/user-base.entity';
import { IsNotEmpty, IsEmail, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class IdentityUserDto {
  public id: string;

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
  @Length(8)
  @IsNotEmpty({ message: 'password cannot be null' })
  public password: string;

  public role: UserRole;
}
