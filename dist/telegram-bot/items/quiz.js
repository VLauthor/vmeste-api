"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Quiz = void 0;
const grammy_1 = require("grammy");
const string_1 = require("../../string/string");
const class_1 = require("../../objects/class");
const quiz = new grammy_1.Composer();
let cache;
let ik;
let db;
class Quiz {
    constructor(c, ink, dbs) {
        this.c = c;
        this.ink = ink;
        this.dbs = dbs;
        this.checkQuizData = async (ctx, user) => {
            if (!user.quiz || !user.quiz.create || !user.quiz.create.quizData) {
                try {
                    ctx.answerCallbackQuery('Данные вашей викторины потеряны, пожалуйста повторите попытку');
                }
                catch {
                    const mes = await ctx.reply('Данные вашей викторины потеряны, пожалуйста повторите попытку');
                    setTimeout(() => {
                        ctx.api.deleteMessage(ctx.from.id, mes.message_id);
                    }, 3000);
                }
                ctx.deleteMessage();
                if (!user.quiz)
                    user.quiz = {};
                user.quiz.create = {};
                user.quiz.create.quizData = { mode: 'public' };
                const mess = await ctx.reply((0, string_1.messageParams)('createQuiz', { quiz: user.quiz.create.quizData }), {
                    parse_mode: 'HTML',
                    reply_markup: ik.createQuiz(user.quiz.create.quizData),
                });
                cache.setEditMessUserQuiz(ctx.from.id, 'quiz', mess.message_id);
                return false;
            }
            return true;
        };
        cache = c;
        ik = ink;
        db = dbs;
        this.init();
    }
    async init() {
        this.setQuizzes();
        quiz.command('q', async (ctx) => {
            const userId = ctx.from.id;
            const user = cache.getUsersTg(userId);
            ctx.deleteMessage();
            if (cache.getAllQuizzes().length === 0) {
                cache.setQuizzes(await db.GetAllQuiz());
            }
            console.log(1);
            const mess = await ctx.reply('Меню викторин', {
                reply_markup: ik.keyboardQuiz(),
                parse_mode: 'HTML',
            });
            cache.setEditMessUserQuiz(ctx.from.id, 'quiz', mess.message_id);
        });
        quiz.callbackQuery('view-all-quiz', async (ctx) => {
        });
        quiz.callbackQuery('createQuiz', async (ctx) => {
            const userId = ctx.from.id;
            const user = cache.getUsersTg(userId);
            if (!user.quiz)
                user.quiz = {};
            user.quiz.create = {};
            user.quiz.create.quizData = { mode: 'public' };
            ctx.editMessageText((0, string_1.messageParams)('createQuiz', { quiz: user.quiz.create.quizData }), {
                parse_mode: 'HTML',
                reply_markup: ik.createQuiz(user.quiz.create.quizData),
            });
        });
        quiz.callbackQuery('finally-create-quiz', async (ctx) => {
            const userId = ctx.from.id;
            const user = cache.getUsersTg(userId);
            if (!(await this.checkQuizData(ctx, user)))
                return;
            const quiz = user.quiz.create.quizData;
            await db.addQuiz(user.id_VL, quiz, user.quiz.create.questions);
            ctx.deleteMessage();
            const mess = await ctx.reply('Викторина создана, вы можете ее посмотреть в разделе викторин');
        });
        quiz.callbackQuery('edit_mode_quiz', async (ctx) => {
            const userId = ctx.from.id;
            const user = cache.getUsersTg(userId);
            if (!(await this.checkQuizData(ctx, user)))
                return;
            if (user.quiz.create.quizData.mode === 'public') {
                user.quiz.create.quizData.mode = 'private';
            }
            else {
                user.quiz.create.quizData.mode = 'public';
            }
            ctx.editMessageText((0, string_1.messageParams)('createQuiz', { quiz: user.quiz.create.quizData }), {
                parse_mode: 'HTML',
                reply_markup: ik.createQuiz(user.quiz.create.quizData),
            });
        });
        quiz.callbackQuery('save-data-quiz', async (ctx) => {
            const user = cache.getUsersTg(ctx.from.id);
            if (!(await this.checkQuizData(ctx, user)))
                return;
            user.quiz.create.cursors = { answer: 0, question: 0 };
            user.quiz.create.questions = [];
            ctx.editMessageText((0, string_1.messageParams)('createQuiz', { quiz: user.quiz.create.quizData }), {
                parse_mode: 'HTML',
                reply_markup: ik.keyboardAddQuestion(user.quiz.create.questions),
            });
        });
        quiz.callbackQuery('save-question', async (ctx) => {
            const user = cache.getUsersTg(ctx.from.id);
            if (!(await this.checkQuizData(ctx, user)))
                return;
            const questions = user.quiz.create.questions;
            const cursor = user.quiz.create.cursors;
            let count = 0;
            for (const item of questions[cursor.question].answers) {
                if (item.correct == true)
                    count++;
            }
            if (count === 0)
                return ctx.answerCallbackQuery('Выберите правильный вариант ответа');
            cursor.answer = 0;
            cursor.question = 0;
            ctx.editMessageText((0, string_1.messageParams)('createQuiz', { quiz: user.quiz.create.quizData }), {
                parse_mode: 'HTML',
                reply_markup: ik.keyboardAddQuestion(questions),
            });
        });
        quiz.callbackQuery('add_questions', async (ctx) => {
            const user = cache.getUsersTg(ctx.from.id);
            if (!(await this.checkQuizData(ctx, user)))
                return console.log(false);
            const cursor = user.quiz.create.cursors;
            try {
                if (!user.quiz.create.questions)
                    user.quiz.create.questions = [];
                user.quiz.create.questions.push({});
                cursor.question = user.quiz.create.questions.length - 1;
                cursor.answer = 0;
                user.quiz.create.questions[cursor.question].answers = [];
            }
            catch (e) {
                console.log(e);
            }
            try {
                ctx.editMessageText((0, string_1.messageParams)('createQuestion', {
                    question: user.quiz.create.questions[cursor.question],
                }), {
                    parse_mode: 'HTML',
                    reply_markup: ik.keyboardCreateQuestion(user.quiz.create.questions[cursor.question].answers, user.quiz.create.questions[cursor.question].title),
                });
            }
            catch (e) {
                console.log(e);
            }
        });
        quiz.callbackQuery('save-answer', async (ctx) => {
            const user = cache.getUsersTg(ctx.from.id);
            if (!(await this.checkQuizData(ctx, user)))
                return console.log(false);
            const cursor = user.quiz.create.cursors;
            try {
                ctx.editMessageText((0, string_1.messageParams)('createQuestion', {
                    question: user.quiz.create.questions[cursor.question],
                }), {
                    parse_mode: 'HTML',
                    reply_markup: ik.keyboardCreateQuestion(user.quiz.create.questions[cursor.question].answers, user.quiz.create.questions[cursor.question].title),
                });
            }
            catch (e) {
                console.log(e);
            }
        });
        quiz.callbackQuery('delete-question', async (ctx) => {
            const user = cache.getUsersTg(ctx.from.id);
            if (!(await this.checkQuizData(ctx, user)))
                return console.log(false);
            const cursor = user.quiz.create.cursors;
            const questions = user.quiz.create.questions;
            for (let i = cursor.question + 1; i < questions.length; i++) {
                questions[cursor.question] = questions[i];
            }
            questions.pop();
            ctx.editMessageText((0, string_1.messageParams)('createQuiz', { quiz: user.quiz.create.quizData }), {
                parse_mode: 'HTML',
                reply_markup: ik.keyboardAddQuestion(questions),
            });
        });
        quiz.callbackQuery('delete-answer', async (ctx) => {
            const user = cache.getUsersTg(ctx.from.id);
            if (!(await this.checkQuizData(ctx, user)))
                return console.log(false);
            const cursor = user.quiz.create.cursors;
            const answer = user.quiz.create.questions[cursor.question].answers;
            for (let i = cursor.answer + 1; i < answer.length; i++) {
                answer[cursor.answer] = answer[i];
            }
            answer.pop();
            try {
                ctx.editMessageText((0, string_1.messageParams)('createQuestion', {
                    question: user.quiz.create.questions[cursor.question],
                }), {
                    parse_mode: 'HTML',
                    reply_markup: ik.keyboardCreateQuestion(user.quiz.create.questions[cursor.question].answers, user.quiz.create.questions[cursor.question].title),
                });
            }
            catch (e) {
                console.log(e);
            }
        });
        quiz.callbackQuery(/^edit-answer=.+$/, async (ctx) => {
            const user = cache.getUsersTg(ctx.from.id);
            if (!(await this.checkQuizData(ctx, user)))
                return console.log(false);
            const cursor = user.quiz.create.cursors;
            const match = ctx.update.callback_query.data;
            console.log(match);
            const i = match.split('=')[1];
            cursor.answer = Number(i);
            const answers = user.quiz.create.questions[cursor.question];
            console.log(answers.answers[cursor.answer]);
            try {
                ctx.editMessageText((0, string_1.messageParams)('createAnswer', {
                    answer: answers.answers[cursor.answer],
                }), {
                    parse_mode: 'HTML',
                    reply_markup: ik.keyboardCreateAnswer(answers.answers[cursor.answer]),
                });
            }
            catch (e) {
                console.log(e);
            }
        });
        quiz.callbackQuery(/^edit-question=.+$/, async (ctx) => {
            const user = cache.getUsersTg(ctx.from.id);
            if (!(await this.checkQuizData(ctx, user)))
                return console.log(false);
            const cursor = user.quiz.create.cursors;
            const match = ctx.update.callback_query.data;
            console.log(match);
            const i = match.split('=')[1];
            cursor.question = Number(i);
            const question = user.quiz.create.questions[cursor.question];
            try {
                ctx.editMessageText((0, string_1.messageParams)('createQuestion', {
                    question: question,
                }), {
                    parse_mode: 'HTML',
                    reply_markup: ik.keyboardCreateQuestion(user.quiz.create.questions[cursor.question].answers, user.quiz.create.questions[cursor.question].title),
                });
            }
            catch (e) {
                console.log(e);
            }
        });
        quiz.callbackQuery('add_text_question', async (ctx) => {
            const user = cache.getUsersTg(ctx.from.id);
            if (!(await this.checkQuizData(ctx, user)))
                return;
            ctx.reply(string_1.message.createNameQuestion, {
                reply_markup: ik.keyboardClose('default'),
            });
        });
        quiz.callbackQuery('add_text_answer', async (ctx) => {
            const user = cache.getUsersTg(ctx.from.id);
            if (!(await this.checkQuizData(ctx, user)))
                return;
            ctx.reply(string_1.message.createNameAnswer, {
                reply_markup: ik.keyboardClose('default'),
            });
        });
        quiz.callbackQuery('add_answer', async (ctx) => {
            const user = cache.getUsersTg(ctx.from.id);
            if (!(await this.checkQuizData(ctx, user)))
                return;
            const cursor = user.quiz.create.cursors;
            const answers = user.quiz.create.questions[cursor.question].answers;
            if (answers.length != 0)
                cursor.answer = answers.length;
            answers.push({ title: null, correct: false });
            console.log(user.quiz.create.questions);
            console.log(user.quiz.create.questions[cursor.question]);
            console.log(user.quiz.create.questions[cursor.question].answers);
            console.log(user.quiz.create.questions[cursor.question].answers[cursor.answer]);
            try {
                ctx.editMessageText((0, string_1.messageParams)('createAnswer', {
                    answer: user.quiz.create.questions[cursor.question].answers[cursor.answer],
                }), {
                    parse_mode: 'HTML',
                    reply_markup: ik.keyboardCreateAnswer(answers[cursor.answer]),
                });
            }
            catch (e) {
                console.log(e);
            }
        });
        quiz.callbackQuery('edit_correct_answer', async (ctx) => {
            const user = cache.getUsersTg(ctx.from.id);
            if (!(await this.checkQuizData(ctx, user)))
                return;
            const cursor = user.quiz.create.cursors;
            const questions = user.quiz.create.questions[cursor.question];
            for (let i = 0; i < questions.answers.length; i++) {
                questions.answers[i].correct = false;
            }
            questions.answers[cursor.answer].correct =
                !questions.answers[cursor.answer].correct;
            try {
                ctx.editMessageText((0, string_1.messageParams)('createAnswer', {
                    answer: questions.answers[cursor.answer],
                }), {
                    parse_mode: 'HTML',
                    reply_markup: ik.keyboardCreateAnswer(questions.answers[cursor.answer]),
                });
            }
            catch (e) {
                console.log(e);
            }
        });
        quiz.callbackQuery('add_name_quiz', async (ctx) => {
            const user = cache.getUsersTg(ctx.from.id);
            if (!(await this.checkQuizData(ctx, user)))
                return;
            ctx.reply(string_1.message.createNameQuiz, {
                reply_markup: ik.keyboardClose('default'),
            });
        });
        quiz.callbackQuery('add_description_quiz', async (ctx) => {
            const user = cache.getUsersTg(ctx.from.id);
            if (!(await this.checkQuizData(ctx, user)))
                return;
            ctx.reply(string_1.message.createDescriptionQuiz, {
                reply_markup: ik.keyboardClose('default'),
            });
        });
        quiz.callbackQuery('add_key_quiz', async (ctx) => {
            const user = cache.getUsersTg(ctx.from.id);
            if (!(await this.checkQuizData(ctx, user)))
                return;
            const random = new class_1.Random(15);
            user.quiz.create.quizData.key = await random.generateString();
            ctx.editMessageText((0, string_1.messageParams)('createQuiz', { quiz: user.quiz.create.quizData }), {
                parse_mode: 'HTML',
                reply_markup: ik.createQuiz(user.quiz.create.quizData),
            });
        });
        quiz.on('message:text', async (ctx, Next) => {
            if (!ctx.message.reply_to_message || !ctx.message.reply_to_message.text) {
                console.log('err-1');
                return Next();
            }
            const textReply = ctx.message.reply_to_message.text;
            if (textReply == string_1.message.createNameQuiz) {
                const user = cache.getUsersTg(ctx.from.id);
                if (!(await this.checkQuizData(ctx, user))) {
                    console.log('err-2');
                    return ctx.deleteMessages([ctx.message.reply_to_message.message_id]);
                }
                ctx.deleteMessages([
                    ctx.message.reply_to_message.message_id,
                    ctx.message.message_id,
                ]);
                const text = ctx.message.text;
                user.quiz.create.quizData.title = text;
                let mess_id;
                console.log(ctx.from.id, 'quiz');
                try {
                    mess_id = await cache.getEditMessUser(ctx.from.id, 'quiz');
                }
                catch (error) {
                    console.error('Ошибка при получении mess_id:', error);
                }
                console.log('check', mess_id);
                if (!mess_id) {
                    console.log('err-3');
                    return;
                }
                console.log(3, user.quiz.create.quizData.title);
                return ctx.api.editMessageText(ctx.from.id, mess_id, (0, string_1.messageParams)('createQuiz', { quiz: user.quiz.create.quizData }), {
                    parse_mode: 'HTML',
                    reply_markup: ik.createQuiz(user.quiz.create.quizData),
                });
            }
            if (textReply == string_1.message.createDescriptionQuiz) {
                const user = cache.getUsersTg(ctx.from.id);
                if (!(await this.checkQuizData(ctx, user))) {
                    console.log('err-2');
                    return ctx.deleteMessages([ctx.message.reply_to_message.message_id]);
                }
                ctx.deleteMessages([
                    ctx.message.reply_to_message.message_id,
                    ctx.message.message_id,
                ]);
                const text = ctx.message.text;
                user.quiz.create.quizData.description = text;
                let mess_id;
                console.log(ctx.from.id, 'quiz');
                try {
                    mess_id = await cache.getEditMessUser(ctx.from.id, 'quiz');
                }
                catch (error) {
                    console.error('Ошибка при получении mess_id:', error);
                }
                console.log('check', mess_id);
                if (!mess_id) {
                    console.log('err-3');
                    return;
                }
                console.log(3, user.quiz.create.quizData.title);
                return ctx.api
                    .editMessageText(ctx.from.id, mess_id, (0, string_1.messageParams)('createQuiz', { quiz: user.quiz.create.quizData }), {
                    parse_mode: 'HTML',
                    reply_markup: ik.createQuiz(user.quiz.create.quizData),
                })
                    .catch(() => { });
            }
            if (textReply == string_1.message.createNameQuestion) {
                const user = cache.getUsersTg(ctx.from.id);
                if (!(await this.checkQuizData(ctx, user))) {
                    console.log('err-2');
                    return ctx.deleteMessages([ctx.message.reply_to_message.message_id]);
                }
                ctx.deleteMessages([
                    ctx.message.reply_to_message.message_id,
                    ctx.message.message_id,
                ]);
                const text = ctx.message.text;
                const cursor = user.quiz.create.cursors;
                user.quiz.create.questions[cursor.question].title = text;
                let mess_id;
                try {
                    mess_id = await cache.getEditMessUser(ctx.from.id, 'quiz');
                }
                catch (error) {
                    console.error('Ошибка при получении mess_id:', error);
                }
                console.log('check', mess_id);
                if (!mess_id) {
                    console.log('err-3');
                    return;
                }
                return ctx.api
                    .editMessageText(ctx.from.id, mess_id, (0, string_1.messageParams)('createQuestion', {
                    question: user.quiz.create.questions[cursor.question],
                }), {
                    parse_mode: 'HTML',
                    reply_markup: ik.keyboardCreateQuestion(user.quiz.create.questions[cursor.question].answers, user.quiz.create.questions[cursor.question].title),
                })
                    .catch(() => { });
            }
            if (textReply == string_1.message.createNameAnswer) {
                const user = cache.getUsersTg(ctx.from.id);
                if (!(await this.checkQuizData(ctx, user))) {
                    console.log('err-2');
                    return ctx.deleteMessages([ctx.message.reply_to_message.message_id]);
                }
                ctx.deleteMessages([
                    ctx.message.reply_to_message.message_id,
                    ctx.message.message_id,
                ]);
                const text = ctx.message.text;
                const cursor = user.quiz.create.cursors;
                user.quiz.create.questions[cursor.question].answers[cursor.answer].title = text;
                let mess_id;
                try {
                    mess_id = await cache.getEditMessUser(ctx.from.id, 'quiz');
                }
                catch (error) {
                    console.error('Ошибка при получении mess_id:', error);
                }
                console.log('check', mess_id);
                if (!mess_id) {
                    console.log('err-3');
                    return;
                }
                return ctx.api
                    .editMessageText(ctx.from.id, mess_id, (0, string_1.messageParams)('createAnswer', {
                    answer: user.quiz.create.questions[cursor.question].answers[cursor.answer],
                }), {
                    parse_mode: 'HTML',
                    reply_markup: ik.keyboardCreateAnswer(user.quiz.create.questions[cursor.question].answers[cursor.answer]),
                })
                    .catch(() => { });
            }
            return Next();
        });
    }
    getComposer() {
        return quiz;
    }
    async setQuizzes() { }
}
exports.Quiz = Quiz;
//# sourceMappingURL=quiz.js.map