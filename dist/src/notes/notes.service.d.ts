import { DatabaseService } from 'src/database/database.service';
import { notesAll, notesDelete, notesNew } from './notes.dto';
export declare class NotesService {
    private db;
    constructor(db: DatabaseService);
    getAllUserNotes: (dto: notesAll) => Promise<void>;
    newNotesUser: (dto: notesNew) => Promise<void>;
    deleteNotesUser: (dto: notesDelete) => Promise<void>;
}
