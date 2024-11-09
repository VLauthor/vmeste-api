import { ResponseInt } from 'src/objects/pesponse.dto';
import { checkCodeDto, createCodeDto, loginDto, signInDto, updatePasswordDto } from './auth.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly service;
    constructor(service: AuthService);
    getLogin(res: Response, dto: loginDto): Promise<any>;
    postRegistration(res: Response, dto: signInDto): Promise<any>;
    postCodeCreate(res: Response, dto: createCodeDto): Promise<any>;
    getCodeCheck(res: Response, dto: checkCodeDto): Promise<any>;
    updatePassword(res: Response, dto: updatePasswordDto): Promise<ResponseInt>;
    test(res: Response): Promise<any>;
}
