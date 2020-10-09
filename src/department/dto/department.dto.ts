import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DepartmentDto {
  public readonly id: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Department Name not provided' })
  public readonly name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Department description not provided' })
  public readonly description: string;
}
