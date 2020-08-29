export declare class PasswordEncrypterService {
    private bcrypt;
    constructor();
    encrypt(password: string, callback?: unknown): Promise<string>;
    decrypt(password: string, encrypted: string, callback?: unknown): Promise<boolean>;
}
