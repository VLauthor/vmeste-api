import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class notesAll {
  @IsString()
  session: string;
}

export class notesNew {
  @IsString()
  session: string;
  @IsString()
  name: string;
  @IsString()
  description: string;
}

export class notesDelete {
  @IsString()
  session: string;
  @IsString()
  id: string;
}
