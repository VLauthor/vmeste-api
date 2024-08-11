import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
export class loginDto {
  @IsString()
  login: string;
  @IsString()
  password: string;
}
export class signinDto {
  @IsString()
  last_name: string;
  @IsString()
  first_name: string;
  @IsOptional()
  @IsString()
  patronomic?: string;
  @IsString()
  mail: string;
  @IsString()
  nickname: string;
  @IsString()
  number: string;
  @Transform(({ value }) => value === '1' || value === 'true')
  @Transform(({ value }) => value === '0' || value === 'false')
  @IsBoolean()
  gender: boolean;
  @IsString()
  date_birthday: string;
  @IsString()
  password: string;
  @IsOptional()
  @IsString()
  tgKey?: string;
}

export class createCodeDto {
  @IsString()
  mail: string;
}

export class checkCodeDto {
  @IsString()
  mail: string;
  @IsString()
  code: string;
}

export class updatePasswordDto {
  @IsString()
  mail: string;
  @IsString()
  code: string;
  @IsString()
  password: string;
}
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
