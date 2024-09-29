import { ConfService } from '../config/configuration.service';
export declare class MailService {
    private config;
    constructor(config: ConfService);
    private transporter;
    sendCode: (mail: string, code: string) => Promise<void>;
}
