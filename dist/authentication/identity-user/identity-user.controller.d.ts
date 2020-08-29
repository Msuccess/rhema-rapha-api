import { Response, Request } from 'express';
import { AuthenticationService } from '../authentication.service';
import { IdentityUserService } from './identity-user.service';
import { RegisterDto } from './dto/register.dto';
export declare class IdentityUserController {
    private readonly authService;
    private readonly identityUserService;
    constructor(authService: AuthenticationService, identityUserService: IdentityUserService);
    register(user: RegisterDto, res: Response): Promise<Response<any>>;
    loginUser(user: {
        email: string;
        password: string;
    }, res: Response): Promise<Response<any>>;
    googleAuth(_req: Request): Promise<void>;
    googleAuthRedirect(req: Request): Promise<any>;
    getUsers(res: Response): Promise<any>;
    delete(id: string, res: Response): Promise<any>;
}
