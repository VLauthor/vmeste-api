export declare class HashService {
    private readonly saltRounds;
    createHash(data: string): Promise<string>;
    checkHash(data: string, hash: string): Promise<boolean>;
}
