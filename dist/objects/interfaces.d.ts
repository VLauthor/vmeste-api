export interface ResultCreateUser {
    code: number;
    user?: object;
    error?: object;
}
export interface Mess {
    code: string;
    status?: false | 'expect' | true;
    time?: number;
    text?: string;
}
export interface User {
    user_id?: number;
    last_name?: string;
    first_name?: string;
    patronomic?: string;
    mail?: string;
    nickname?: string;
    gender?: boolean;
    date_birthday?: string;
    password_hash?: string;
}
export interface Quiz {
    title?: string;
    description?: string;
    mode: 'private' | 'public';
    key?: string;
    questions?: Questions;
}
export interface QuizBD {
    quiz_id?: number;
    author_id?: number;
    title?: string;
    description?: string;
    private?: boolean;
    key?: string;
    questions?: Questions[];
}
export interface Questions {
    question_id?: number;
    quiz_id?: number;
    title?: string;
    answers?: Answers[];
}
export interface Answers {
    answer_id?: number;
    question_id?: number;
    title?: string;
    correct?: boolean;
}
export interface DataMessage {
    remindersStat?: {
        count: number;
        past: number;
        future: number;
    };
    reminder?: Reminder;
    inpDateReminders?: {
        day?: number | string;
        month?: number | string;
        year?: number | string;
        hour?: number | string;
        minute?: number | string;
    };
    quiz?: Quiz;
    question?: Questions;
    cursors?: {
        question?: number;
        answer?: number;
    };
    answer?: Answers;
}
export interface Reminder {
    reminders_id?: number;
    title?: string;
    description?: string;
    date?: string;
    time?: string;
}
export interface MailMassage {
    from: string;
    to: string;
    subject: string;
    html: string;
    attachments?: Array<MailAttachments>;
}
export interface MailAttachments {
    filename: string;
    path: string;
    cid: string;
}
export interface Json {
    code: number;
    key?: string;
    user_id?: number;
    data?: string;
    error?: string;
    bool?: boolean;
}
export interface KeysTelegramLogin {
    [key: string]: boolean;
}
export interface objectUser {
    user_id?: number;
    last_name?: string;
    first_name?: string;
    patronomic?: string;
    number?: string;
    mail?: string;
    nickname?: string;
    gender?: string;
    date_birthday?: Date;
    password_hash?: string;
}
export interface Response {
    statusCode: number;
    error?: string;
    message?: string;
}
export interface TGUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: 'VLauthor';
    bio?: 'творчество - единственное, что может подарить человеку второе дыхание.';
    photo?: string;
}
export interface CacheTelegram {
    id: number;
    first_name: string;
    last_name?: string | null;
    username?: string | null;
    photo_mini_url?: string | null;
    photo_medium_url?: string | null;
    photo_max_url?: string | null;
    bio?: string | null;
    bool: boolean | null;
}
export interface paramsStepMinute {
    tag: string;
    step: number;
    thisMinute: number;
}
export interface ChacheTelegramLogin {
    bool: boolean | null;
    session?: string;
}
export interface Slider {
    thisI: number;
    count: number;
}
export interface TelegramUserData {
    id_VL: number;
    last_name: string;
    first_name: string;
    patronomic?: string;
    mail: string;
    nickname: string;
    date_birthday: Date;
    number: string;
    reminders?: {
        all?: Array<Reminder>;
        createReminder?: Reminder;
    };
    slider?: Slider;
    inputs?: {
        date?: DateInp;
    };
    quiz?: {
        create?: {
            quizData?: Quiz;
            questions?: Questions[];
            cursors?: {
                question?: number;
                answer?: number;
            };
        };
        all?: QuizBD[];
    };
    editMess?: {
        quiz?: number;
    };
}
export type formatTime = 'AM' | 'PM';
export interface DateInp {
    year?: number;
    month?: number;
    day?: number;
    hour?: number;
    minute?: number;
    formatTime?: formatTime;
}
export interface monthItem {
    num: number;
    eng: string;
    rus: string;
    countDay: number;
}
export interface stepCancel {
    tag: string;
    step: number;
    boolCancel: boolean;
    callback?: string;
}
export interface stepHourParams {
    tag: string;
    step: number;
    thisHour: number;
    format: formatTime;
}
export interface AnswersBD {
    answer_id: 1;
    title: 'Омы';
    correct: true;
}
