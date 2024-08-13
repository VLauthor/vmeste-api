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
            notes_id: number;
            description: string;
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
            notes_id: number;
            description: string;
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
            notes_id: number;
            description: string;
        }[];
        message?: undefined;
    }>;
}
