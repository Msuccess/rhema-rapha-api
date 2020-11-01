import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientRepository } from './patient.repository';
import { QueryModel } from '../shared/model/query.model';
import { ResultException } from '../configuration/exceptions/result';
import { PatientDto } from './dto/patient.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(PatientRepository)
    private readonly patientRepository: PatientRepository,
  ) {}

  public async getPatients(query: QueryModel) {
    try {
      return await this.patientRepository.find({
        relations: ['appointment'],
        take: query.pageSize,
        skip: query.pageSize * (query.page - 1),
        order: { createdAt: 'DESC' },
        where:{
          isDeleted:false
        }
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getPatientUserId(id: string) {
    try {
      return await this.patientRepository.findOne({
        where: {
          userId: id,
        },
      });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getPatient(id: string) {
    try {
      return await this.patientRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getPatientByEmail(email: string): Promise<PatientDto> {
    try {
      return await this.patientRepository.findOne({
        where:{
        email:email,
        isDeleted:false
      }});
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async addPatient(newPatient: PatientDto) {
    try {
      return await this.patientRepository.save(newPatient);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updatePatientPassword(email: string, password: string) {
    const dbPatient = await this.getPatientByEmail(email);
    if (dbPatient) {
      dbPatient.password = password;
      return await this.patientRepository.update(dbPatient.id, dbPatient);
    } else {
      return new ResultException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  public async updatePatient(id: string, newPatient: PatientDto) {
    try {
      const dbPatient = await this.getPatient(id);

      if (dbPatient) {
        return await this.patientRepository.update(id, newPatient);
      } else {
        return new ResultException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async deletePatient(id: string) {
    try {
      const dbPatient = await this.getPatient(id);

      if (dbPatient) {
        
        const patient = new PatientDto();
        patient.address = dbPatient.address;
        patient.isDeleted=true;
        patient.bloodPressure = dbPatient.bloodPressure;
        patient.bloodType = dbPatient.bloodType;
        patient.dateOfBirth = dbPatient.dateOfBirth;
        patient.email = dbPatient.email;
        patient.fullName = dbPatient.fullName;
        patient.gender = dbPatient.gender;
        patient.password = dbPatient.password;
        patient.userId = dbPatient.userId;
        patient.height = dbPatient.height;
        patient.role = dbPatient.role;
        return await this.patientRepository.update(id, patient);
      } else {
        return new ResultException('User not found', HttpStatus.NOT_FOUND);
      }

      // await this.patientRepository.query(`DELETE FROM public."AppointmentTbl" WHERE "patientId" = '${id}'`);
      // return await this.patientRepository.delete(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

}
