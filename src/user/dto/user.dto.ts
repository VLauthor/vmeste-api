import {
  IsBoolean,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsEmail,
  IsPhoneNumber,
  IsDateString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class getTelegramLoginDto {
  @IsString()
  code: string;
}

export class getValidPersonalData {
  @IsString()
  nickname: string;
}

export class getValid2FA {
  @IsString()
  mail: string;
  @IsString()
  phone: string;
}

export class getUserInfo {
  @IsString()
  session: string;
}
