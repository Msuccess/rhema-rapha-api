import { IdentityUserDto } from './dto/identity-user.dto';
import { ResultException } from '../../configuration/exceptions/result';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IdentityUserRepository } from './identity-user.repository';

@Injectable()
export class IdentityUserService {
  constructor(
    @InjectRepository(IdentityUserRepository)
    private identityUserRepository: IdentityUserRepository,
  ) {}

  public async getUserByEmail(email: string): Promise<IdentityUserDto> {
    try {
      return await this.identityUserRepository.findOne({ email });
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getUserById(id: string): Promise<IdentityUserDto> {
    try {
      return await this.identityUserRepository.findOne(id);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updatePassword(id: string, password: string) {
    try {
      const dbUser = await this.getUserById(id);
      if (dbUser) {
        dbUser.password = password;
        return await this.identityUserRepository.update(id, dbUser);
      } else {
        return new ResultException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async updateUser(id: string, newUser: any) {
    try {
      const dbUser = await this.getUserById(id);
      if (dbUser) {
        return await this.identityUserRepository.update(id, newUser);
      } else {
        return new ResultException('User not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async getAllUser(): Promise<any> {
    try {
      return await this.identityUserRepository.find();
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async createUser(user: IdentityUserDto) {
    try {
      return await this.identityUserRepository.save(user);
    } catch (error) {
      new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }

  public async deleteUser(userId: string) {
    try {
      return await this.identityUserRepository.delete(userId);
    } catch (error) {
      return new ResultException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
