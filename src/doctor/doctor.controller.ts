import { User } from '../common/decorators/current-user.decorator';
import { PasswordEncrypterService } from '../authentication/passport/password-encrypter.service';
import {
  Controller,
  Get,
  Res,
  Query,
  HttpStatus,
  Param,
  Body,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { Roles } from '../common/decorators/role.decorator';
import { QueryModel } from '../shared/model/query.model';
import { Response } from 'express';
import { DoctorService } from './doctor.service';
import { DoctorDto } from './dto/doctor.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../common/guards/role.guard';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Doctor')
@Controller('doctor')
@UseGuards(AuthGuard(), RoleGuard)
export class DoctorController {
  constructor(
    private readonly doctorService: DoctorService,
    private passwordEncrypterService: PasswordEncrypterService,
  ) {}

  @Get()
  @Roles('admin', 'patient')
  public async getDoctors(
    @Res() res: Response,
    @Query() query: QueryModel,
  ): Promise<any> {
    const response = await this.doctorService.getDoctors(query);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'All Doctors data', data: response });
  }

  @Get('self')
  @Roles('doctor')
  public async getDoctorByEmail(
    @Res() res: Response,
    @User() user: any,
  ): Promise<any> {
    const response = await this.doctorService.getDoctorByEmail(user.email);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'All Doctors data', data: response });
  }

  @Get('/:id')
  @Roles('admin', 'doctor', 'patient')
  public async getById(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.doctorService.getDoctor(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Doctor Data', data: response });
  }

  @Get('department/:id')
  @Roles('admin', 'doctor', 'patient')
  public async getDoctorsByDepartmentId(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.doctorService.getByDepartmentId(id);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Doctor Data', data: response });
  }

  @Put('/:id')
  @Roles('admin', 'doctor')
  public async update(
    @Param('id') id: string,
    @Body() Doctor: DoctorDto,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.doctorService.updateDoctor(id, Doctor);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Doctor updated', data: response });
  }

  @Delete('/:id')
  @Roles('admin')
  public async delete(
    @Param('id') id: string,
    @Res() res: Response,
  ): Promise<any> {
    const response = await this.doctorService.deleteDoctor(id);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'Doctor deleted', data: response });
  }
}
