import { ResultException } from './../configuration/exceptions/result';
import { PatientRepository } from './../patient/patient.repository';
import { DoctorRepository } from './../doctor/doctor.repository';
import { DepartmentRepository } from './../department/department.repository';
import { AppointmentRepository } from './../appointment/appointment.repository';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(AppointmentRepository)
    private readonly appointmentRepository: AppointmentRepository,
    @InjectRepository(DepartmentRepository)
    private readonly departmentRepository: DepartmentRepository,
    @InjectRepository(DoctorRepository)
    private readonly doctorRepository: DoctorRepository,
    @InjectRepository(PatientRepository)
    private readonly patientRepository: PatientRepository,
  ) {}

  public async getNumberOfDoctors() {
    try {
      return await this.doctorRepository.findAndCount();
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getNumberOfPatients() {
    try {
      return await this.patientRepository.findAndCount();
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getNumberOfDepartments() {
    try {
      return await this.departmentRepository.findAndCount();
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getNumberOfAppointments() {
    try {
      return await this.appointmentRepository.findAndCount();
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getRecentAppointments() {
    try {
      const recentAppointments = await this.appointmentRepository.find({
        order: { createdAt: 'DESC' },
      });

      return recentAppointments.slice(0, 5);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getNewPatients() {
    try {
      const newPatient = await this.patientRepository.find({
        order: { createdAt: 'DESC' },
      });
      return newPatient.slice(0, 10);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getNewDoctors() {
    try {
      const newDoctor = await this.doctorRepository.find({
        order: { createdAt: 'DESC' },
      });
      return newDoctor.slice(0, 10);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getDepartmentsAndNumberOfDoctors() {
    try {
      const pushr = [];
      const newDoctor = await this.departmentRepository.find();
      newDoctor.forEach(r => {
        r.name, r.doctor.length;
        pushr.push(r);
      });
      return pushr;
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getDepartmentsAndDoctor() {
    try {
      return await this.departmentRepository.find();
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
