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
            notes_id: number;
            description: string;
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
            notes_id: number;
            description: string;
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
            notes_id: number;
            description: string;
        }[];
        message?: undefined;
    }>;
}
