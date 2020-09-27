import { IdentityUserService } from './identity-user/identity-user.service';
import { JwtService } from '@nestjs/jwt';
import { PasswordEncrypterService } from './auth-configuration/password-encrypter.service';
import { DoctorService } from '../doctor/doctor.service';
import { PatientService } from '../patient/patient.service';
import { RegisterDto } from './identity-user/dto/register.dto';
export declare class AuthenticationService {
    private readonly passwordEncryptedService;
    private readonly jwtService;
    private readonly identityUserService;
    private readonly doctorService;
    private readonly patientService;
    constructor(passwordEncryptedService: PasswordEncrypterService, jwtService: JwtService, identityUserService: IdentityUserService, doctorService: DoctorService, patientService: PatientService);
    register(data: RegisterDto): Promise<any>;
    signIn(user: {
        email: string;
        password: string;
    }): Promise<any>;
    googleLogin(req: any): Promise<any>;
    validateUser(email: string): Promise<any>;
    private createToken;
    private verifyToken;
}
