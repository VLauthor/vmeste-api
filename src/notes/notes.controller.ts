import {
  Get,
  Controller,
  Query,
  Post,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { notesAll, notesDelete, notesNew } from './notes.dto';
import { NotesService } from './notes.service';

@Controller('notes')
export class NotesController {
  constructor(private s: NotesService) {}
  @UsePipes(new ValidationPipe())
  @Get()
  allNotes(@Query() dto: notesAll) {
    return this.s.getAllUserNotes(dto);
  }
  @UsePipes(new ValidationPipe())
  @Post()
  postNotes(@Query() dto: notesNew) {
    return this.s.newNotesUser(dto);
  }
  @UsePipes(new ValidationPipe())
  @Delete()
  deleteNotes(@Query() dto: notesDelete) {
    return this.s.deleteNotesUser(dto);
  }
}
