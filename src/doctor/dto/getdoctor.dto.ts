import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { UserRole } from '../../shared/user-base.entity';

export class GetDoctorDto {
         public readonly id: string;
         @ApiProperty()
         @IsNotEmpty({ message: 'Email cannot be null' })
         @IsEmail()
         public readonly email: string;
         @ApiProperty()
         @IsNotEmpty({ message: 'First name cannot be null' })
         public readonly fullName: string;
         @ApiProperty()
         @IsNotEmpty({ message: 'Phonenumber cannot be null' })
         public readonly phonenumber: string;
         @ApiProperty()
         @IsNotEmpty({ message: 'Department cannot be null' })
         public readonly departmentId: string;
         @ApiProperty()
         @IsNotEmpty({ message: 'Days Available cannot be null' })
         public readonly daysAvailable: string;
         @ApiProperty()
         @IsNotEmpty({ message: 'Days Available cannot be null' })
         public readonly timesAvailable: string;
         @ApiProperty()
         public readonly address: string;

         public readonly role: UserRole;
       }
