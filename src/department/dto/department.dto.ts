import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DepartmentDto {
  public  id: string;
  @ApiProperty()
  @IsNotEmpty({ message: 'Department Name not provided' })
  public  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Department description not provided' })
  public  description: string;

  isDeleted:boolean;
}
