import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { UserRole } from 'src/common/entity/user-base.entity';

export class GetUserDto {
  public readonly id: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Email cannot be null' })
  @IsEmail()
  public readonly email: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'First name cannot be null' })
  public readonly fullName: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Phone number cannot be null' })
  public readonly phonenumber: string;

  public readonly role: UserRole = UserRole.ADMIN;
}
