import { AuthenticationService } from '../authentication.service';
import { Strategy } from 'passport-jwt';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authenticationService;
    constructor(authenticationService: AuthenticationService);
    validate(req: any, _payload: any): Promise<any>;
}
export {};
