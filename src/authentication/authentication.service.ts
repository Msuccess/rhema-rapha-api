import { DoctorDto } from './../doctor/dto/doctor.dto';
import { PatientDto } from './../patient/dto/patient.dto';
import { IdentityUserService } from './identity-user/identity-user.service';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EXPIRESIN } from '../configuration/config';
import { PasswordEncrypterService } from './passport/password-encrypter.service';
import { IdentityUserDto } from './identity-user/dto/identity-user.dto';
import { ResultException } from '../configuration/exceptions/result';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';
import { UserRole } from '../common/entity/user-base.entity';
import { RegisterDto } from './identity-user/dto/register.dto';
import { ChangePasswordDto } from './identity-user/dto/change-password.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly passwordEncryptedService: PasswordEncrypterService,
    private readonly jwtService: JwtService,
    private readonly identityUserService: IdentityUserService,
    private readonly doctorService: DoctorService,
    private readonly patientService: PatientService,
  ) {}

  public async register(data: RegisterDto): Promise<any> {
    try {
      const dbUser = await this.validateUser(data.email).catch(error =>
        console.log('>>>>>>>>>>', error),
      );

      if (typeof dbUser === 'object' && dbUser !== null) {
        throw new HttpException(
          { message: 'User Already Exit' },
          HttpStatus.BAD_REQUEST,
        );
      }

      const password = (
        await this.passwordEncryptedService.encrypt(data.password)
      ).toString();

      const user = new IdentityUserDto();
      user.email = data.email;
      user.fullName = data.fullName;
      user.phonenumber = data.phonenumber;

      user.password = password;

      switch (data.role.toLowerCase()) {
        case 'patient':
          const patient = new PatientDto();
          patient.dateOfBirth = data.dateOfBirth;
          patient.email = data.email;
          patient.fullName = data.fullName;
          patient.password = password;

          patient.phonenumber = data.phonenumber;
          patient.role = UserRole.PATIENT;

          const patientDb = await this.patientService.addPatient(patient);

          if (typeof patientDb === 'object' && patientDb !== null) {
            user.role = UserRole.PATIENT;
            const userDb = await this.identityUserService.createUser(user);

            patientDb.userId = userDb.id;

            this.patientService
              .updatePatient(patientDb.id, patientDb)
              .catch(error => console.log('>>>>>>>>>>', error));
            return await this.getJwtToken(userDb);
          }

        case 'doctor':
          const doctor = new DoctorDto();
          doctor.daysAvailable = data.daysAvailable;
          doctor.email = data.email;
          doctor.fullName = data.fullName;
          doctor.password = password;
          doctor.departmentId = data.departmentId;
          doctor.phonenumber = data.phonenumber;
          doctor.daysAvailable = data.daysAvailable;
          doctor.timesAvailable = data.timesAvailable;
          doctor.role = UserRole.DOCTOR;

          const doctorDb = await this.doctorService.addDoctor(doctor);

          if (typeof doctorDb === 'object' && doctorDb !== null) {
            user.role = UserRole.DOCTOR;
            const userDb = await this.identityUserService.createUser(user);

            doctorDb.userId = userDb.id;

            this.doctorService
              .updateDoctor(doctorDb.id, doctorDb)
              .catch(error => console.log('>>>>>>>>>>', error));

            return await this.getJwtToken(userDb);
          }

        case 'admin':
          user.role = UserRole.ADMIN;
          return this.identityUserService.createUser(user);

        default:
          return new ResultException(
            'Role not allowed',
            HttpStatus.BAD_REQUEST,
          );
      }
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async signIn(user: { email: string; password: string }): Promise<any> {
    try {
      const dbUser = await this.identityUserService
        .getUserByEmail(user.email)
        .catch(error => console.log('>>>>>>>>>>', error));

      if (!dbUser || Object.keys(dbUser).length === 0) {
        return new ResultException('Wrong credentials', HttpStatus.BAD_REQUEST);
      }

      const verifyPassword = await this.passwordEncryptedService.decrypt(
        user.password,
        dbUser.password,
      );

      if (verifyPassword) {
        const token = await this.createToken(
          dbUser.id,
          dbUser.email,
          dbUser.role,
        );
        delete dbUser.password;
        return { token, dbUser };
      }
      return new ResultException('Wrong credentials', HttpStatus.BAD_REQUEST);
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async forgottenPassword(email: string) {
    const dbUser = await this.identityUserService.getUserByEmail(email);
  }

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public async googleLogin(req: any): Promise<any> {
    if (!req.user) {
      return new ResultException('No user from google', HttpStatus.BAD_REQUEST);
    }

    if (this.validateUser(req.user.email)) {
      const newUser = new IdentityUserDto();
      newUser.email = req.user.email;
      newUser.fullName = req.user.fullName;
      newUser.role = UserRole.PATIENT;

      return this.identityUserService.createUser(newUser);
    } else {
      const dbUser = await this.validateUser(req.user.email).catch(error =>
        console.log('>>>>>>>>>>', error),
      );
      this.getJwtToken(dbUser);
    }
  }

  public async validateUser(email: string): Promise<any> {
    try {
      return await this.identityUserService.getUserByEmail(email);
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async changeUserPassword(
    user: any,
    passwordValues: ChangePasswordDto,
  ) {
    try {
      const dbUser = await this.identityUserService.getUserByEmail(user.email);

      if (!dbUser || Object.keys(dbUser).length === 0) {
        return new ResultException('Wrong credentials', HttpStatus.BAD_REQUEST);
      }

      const verifyPassword = await this.passwordEncryptedService.decrypt(
        passwordValues.oldPassword,
        dbUser.password,
      );

      if (!verifyPassword) {
        return;
      }
      const password = (
        await this.passwordEncryptedService.encrypt(passwordValues.newPassword)
      ).toString();

      const status = await this.identityUserService.updatePassword(
        dbUser.id,
        password,
      );
      if (status) {
        switch (dbUser.role.toLowerCase()) {
          case 'patient':
            return this.patientService.updatePatientPassword(
              dbUser.email,
              password,
            );

          case 'doctor':
            return this.doctorService.updateDoctorPassword(
              dbUser.email,
              password,
            );

          default:
            return;
        }
      }
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  private async createToken(id: string, email: string, role: UserRole) {
    const expiresIn = EXPIRESIN;
    const user = { id: id, email: email, role: role };
    const token = this.jwtService.sign(user);

    return { expiresIn: expiresIn, token };
  }

  private verifyToken(token: string): any {
    this.jwtService.verify(token);
  }

  private async getJwtToken(dbUser: any) {
    const token = await this.createToken(dbUser.id, dbUser.email, dbUser.role);
    delete dbUser.password;
    return { token, dbUser };
  }
}
