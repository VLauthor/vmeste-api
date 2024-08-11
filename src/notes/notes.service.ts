import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { notesAll, notesDelete, notesNew } from './notes.dto';

@Injectable()
export class NotesService {
  constructor(private db: DatabaseService) {}
  getAllUserNotes = async (dto: notesAll) => {
    console.log(dto.session);
    const resUserId = await this.db.getUserIdBySession(dto.session);
    if (resUserId == false)
      throw new BadRequestException('session does not exist');
    const notes = await this.db.getAllUserNotes(resUserId);
    if (notes.length == 0)
      return { statusCode: HttpStatus.OK, message: 'not notes' };
    return { statusCode: HttpStatus.OK, notes: notes };
  };
  newNotesUser = async (dto: notesNew) => {
    const resUserId = await this.db.getUserIdBySession(dto.session);
    if (resUserId == false)
      throw new BadRequestException('session does not exist');
    await this.db.postNoteUser(resUserId, dto.name, dto.description);
    const notes = await this.db.getAllUserNotes(resUserId);
    if (notes.length == 0)
      return { statusCode: HttpStatus.OK, message: 'not notes' };
    return { statusCode: HttpStatus.CREATED, notes: notes };
  };
  deleteNotesUser = async (dto: notesDelete) => {
    const resUserId = await this.db.getUserIdBySession(dto.session);
    if (!Number(dto.id)) throw new BadRequestException('id not valid');
    if (resUserId == false)
      throw new BadRequestException('session does not exist');
    await this.db.deleteNoteUser(Number(dto.id));
    const notes = await this.db.getAllUserNotes(resUserId);
    if (notes.length == 0)
      return { statusCode: HttpStatus.OK, message: 'not notes' };
    return { statusCode: HttpStatus.OK, notes: notes };
  };
}
