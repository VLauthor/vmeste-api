import { HttpStatus } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { notesAll, notesDelete, notesNew } from './notes.dto';
export declare class NotesService {
    private db;
    constructor(db: DatabaseService);
    getAllUserNotes: (dto: notesAll) => Promise<{
        statusCode: HttpStatus;
        message: string;
        notes?: undefined;
    } | {
        statusCode: HttpStatus;
        notes: {
            name: string;
            description: string;
            notes_id: number;
        }[];
        message?: undefined;
    }>;
    newNotesUser: (dto: notesNew) => Promise<{
        statusCode: HttpStatus;
        message: string;
        notes?: undefined;
    } | {
        statusCode: HttpStatus;
        notes: {
            name: string;
            description: string;
            notes_id: number;
        }[];
        message?: undefined;
    }>;
    deleteNotesUser: (dto: notesDelete) => Promise<{
        statusCode: HttpStatus;
        message: string;
        notes?: undefined;
    } | {
        statusCode: HttpStatus;
        notes: {
            name: string;
            description: string;
            notes_id: number;
        }[];
        message?: undefined;
    }>;
}
