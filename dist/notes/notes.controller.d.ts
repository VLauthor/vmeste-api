import { notesAll, notesDelete, notesNew } from './notes.dto';
import { NotesService } from './notes.service';
export declare class NotesController {
    private s;
    constructor(s: NotesService);
    allNotes(dto: notesAll): Promise<void>;
    postNotes(dto: notesNew): Promise<void>;
    deleteNotes(dto: notesDelete): Promise<void>;
}
