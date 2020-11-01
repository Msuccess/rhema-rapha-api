import { JwtStrategy } from './passport/jwt.strategy';
import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { PasswordEncrypterService } from './passport/password-encrypter.service';
import { IdentityUserController } from './identity-user/identity-user.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { SECRET, EXPIRESIN } from '../configuration/config';
import { GoogleStrategy } from './passport/google.strategy';
import { PatientModule } from '../patient/patient.module';
import { DoctorModule } from '../doctor/doctor.module';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [
    PatientModule,
    DoctorModule,

    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || SECRET,
      signOptions: { expiresIn: EXPIRESIN },
    }),
    SharedModule,
  ],
  controllers: [IdentityUserController],
  providers: [
    AuthenticationService,
    PasswordEncrypterService,
    JwtStrategy,
    GoogleStrategy,
  ],
  exports: [PassportModule, AuthenticationService, PasswordEncrypterService],
})
export class AuthenticationModule {}
