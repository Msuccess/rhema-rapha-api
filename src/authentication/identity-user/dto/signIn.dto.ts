import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, IsEmail } from 'class-validator';
import { UserRole } from '../../../common/entity/user-base.entity';

export class SignInDto {
  @ApiProperty()
  @Length(8)
  @IsNotEmpty({ message: 'password cannot be null' })
  public password: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email cannot be null' })
  @IsEmail()
  public email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Role cannot be null' })
  public role: UserRole;
}
