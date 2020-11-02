import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorRepository } from './doctor.repository';
import { QueryModel } from '../shared/model/query.model';
import { ResultException } from '../configuration/exceptions/result';
import { DoctorDto } from './dto/doctor.dto';
import { GetDoctorDto } from './dto/getdoctor.dto';
import { IdentityUserService } from '../authentication/identity-user/identity-user.service';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(DoctorRepository)
    private readonly doctorRepository: DoctorRepository,
    private readonly identityUserService: IdentityUserService,
  ) {}

  public async getDoctors(query: QueryModel): Promise<any> {
    try {
      return await this.doctorRepository.find({
        relations: ['appointment'],
        take: query.pageSize,
        skip: query.pageSize * (query.page - 1),
        order: { createdAt: 'DESC' },
        where: {
          isDeleted: false,
        },
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getByDepartmentId(id: string): Promise<any> {
    try {
      return await this.doctorRepository.find({
        where: { departmentId: id },
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getDoctor(id: string): Promise<GetDoctorDto> {
    try {
      return await this.doctorRepository.findOne({
        where: {
          id: id,
          isDeleted: false,
        },
        relations: ['department'],
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getDoctorByEmail(email: string): Promise<DoctorDto> {
    try {
      return await this.doctorRepository.findOne({ email });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async addDoctor(newDoctor: DoctorDto) {
    try {
      return await this.doctorRepository.save(newDoctor);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateDoctorPassword(email: string, password: string) {
    try {
      const dbDoctor = await this.getDoctorByEmail(email);

      if (dbDoctor) {
        dbDoctor.password = password;
        return await this.doctorRepository.update(dbDoctor.id, dbDoctor);
      } else {
        new ResultException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateDoctor(id: string, newDoctor: DoctorDto) {
    try {
      const dbDoctor = await this.getDoctor(id);
      if (dbDoctor) {
        return await this.doctorRepository.update(id, newDoctor);
      } else {
        new ResultException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteDoctor(id: string) {
    try {
      //   const dbDoctor = await this.getDoctor(id);
      //   if (dbDoctor) {
      //      const doc = new DoctorDto();
      //      doc.address = dbDoctor.address;
      //      doc.isDeleted = true;
      //     doc.daysAvailable = dbDoctor.daysAvailable;
      //      doc.departmentId = dbDoctor.departmentId;
      //      doc.email = dbDoctor.email;
      //      doc.fullName = dbDoctor.fullName;
      //      doc.password = dbDoctor.password;
      //      doc.phonenumber = dbDoctor.phonenumber;
      //      doc.role = dbDoctor.role;
      //      doc.timesAvailable = dbDoctor.timesAvailable;
      // doc.userId = dbDoctor.userId;

      //     return await this.doctorRepository.update(id, doc);
      //   } else {
      //     new ResultException('User not found', HttpStatus.NOT_FOUND);
      //   }
      // await this.doctorRepository.query(`DELETE FROM public."AppointmentTbl" WHERE "doctorId" = '${id}'`);
      return await this.doctorRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
