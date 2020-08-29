import { IdentityUserDto } from './dto/identity-user.dto';
import { IdentityUserRepository } from './identity-user.repository';
import { ResultException } from '../../configuration/exceptions/result';
export declare class IdentityUserService {
    private IdentityUserRepository;
    constructor(IdentityUserRepository: IdentityUserRepository);
    getUserByEmail(email: string): Promise<IdentityUserDto>;
    getUserById(id: string): Promise<IdentityUserDto>;
    getAllUser(): Promise<any>;
    createUser(user: IdentityUserDto): Promise<ResultException>;
    deleteUser(userId: string): Promise<import("typeorm").DeleteResult | ResultException>;
}
