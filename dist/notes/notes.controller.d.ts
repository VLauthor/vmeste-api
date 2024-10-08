import { notesAll, notesDelete, notesNew } from './notes.dto';
import { NotesService } from './notes.service';
export declare class NotesController {
    private s;
    constructor(s: NotesService);
    allNotes(dto: notesAll): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        notes?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        notes: {
            name: string;
            description: string;
            notes_id: number;
        }[];
        message?: undefined;
    }>;
    postNotes(dto: notesNew): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        notes?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        notes: {
            name: string;
            description: string;
            notes_id: number;
        }[];
        message?: undefined;
    }>;
    deleteNotes(dto: notesDelete): Promise<{
        statusCode: import("@nestjs/common").HttpStatus;
        message: string;
        notes?: undefined;
    } | {
        statusCode: import("@nestjs/common").HttpStatus;
        notes: {
            name: string;
            description: string;
            notes_id: number;
        }[];
        message?: undefined;
    }>;
}
