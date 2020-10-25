import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Email cannot be null' })
  public readonly oldPassword: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'First name cannot be null' })
  public readonly newPassword: string;
}
