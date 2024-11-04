-- CreateTable
CREATE TABLE "Users" (
    "user_id" SERIAL NOT NULL,
    "last_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "patronomic" TEXT,
    "mail" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "gender" BOOLEAN NOT NULL DEFAULT true,
    "role_id" INTEGER NOT NULL DEFAULT 1,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "date_registration" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_birthday" TIMESTAMP(3) NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Telegram_Users" (
    "node_id" SERIAL NOT NULL,
    "user_tg_id" BIGINT,
    "user_id" INTEGER NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "username" TEXT,
    "photo_mini_url" TEXT,
    "photo_medium_url" TEXT,
    "photo_max_url" TEXT,
    "bio" TEXT,

    CONSTRAINT "Telegram_Users_pkey" PRIMARY KEY ("node_id")
);

-- CreateTable
CREATE TABLE "Code" (
    "node_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "date_create" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Code_pkey" PRIMARY KEY ("node_id")
);

-- CreateTable
CREATE TABLE "Notes" (
    "notes_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("notes_id")
);

-- CreateTable
CREATE TABLE "Reminders" (
    "reminders_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "Reminders_pkey" PRIMARY KEY ("reminders_id")
);

-- CreateTable
CREATE TABLE "Difficulty" (
    "d_id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Difficulty_pkey" PRIMARY KEY ("d_id")
);

-- CreateTable
CREATE TABLE "Category" (
    "c_id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("c_id")
);

-- CreateTable
CREATE TABLE "Limitation" (
    "l_id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "Limitation_pkey" PRIMARY KEY ("l_id")
);

-- CreateTable
CREATE TABLE "Quiz" (
    "quiz_id" SERIAL NOT NULL,
    "author_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "difficulty_id" INTEGER,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "key" TEXT,
    "time_limit" INTEGER,
    "limitationL_id" INTEGER,

    CONSTRAINT "Quiz_pkey" PRIMARY KEY ("quiz_id")
);

-- CreateTable
CREATE TABLE "CategoryQuiz" (
    "cq_id" SERIAL NOT NULL,
    "quizQuiz_id" INTEGER,
    "categoryC_id" INTEGER,

    CONSTRAINT "CategoryQuiz_pkey" PRIMARY KEY ("cq_id")
);

-- CreateTable
CREATE TABLE "LimitationQuiz" (
    "lq_id" SERIAL NOT NULL,
    "limitationL_id" INTEGER,
    "quizQuiz_id" INTEGER,

    CONSTRAINT "LimitationQuiz_pkey" PRIMARY KEY ("lq_id")
);

-- CreateTable
CREATE TABLE "QuestionsType" (
    "qt_id" SERIAL NOT NULL,
    "value" TEXT NOT NULL,

    CONSTRAINT "QuestionsType_pkey" PRIMARY KEY ("qt_id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "question_id" SERIAL NOT NULL,
    "quiz_id" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "hint" TEXT NOT NULL,
    "questionsTypeQt_id" INTEGER,
    "score" INTEGER NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "Answers" (
    "answer_id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "flag" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("answer_id")
);

-- CreateTable
CREATE TABLE "UserAnswors" (
    "node_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,
    "answer_id" INTEGER NOT NULL,

    CONSTRAINT "UserAnswors_pkey" PRIMARY KEY ("node_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_mail_key" ON "Users"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "Users_nickname_key" ON "Users"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Telegram_Users_user_tg_id_key" ON "Telegram_Users"("user_tg_id");

-- CreateIndex
CREATE UNIQUE INDEX "Telegram_Users_user_id_key" ON "Telegram_Users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Code_user_id_key" ON "Code"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Difficulty_value_key" ON "Difficulty"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Category_value_key" ON "Category"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Limitation_value_key" ON "Limitation"("value");

-- AddForeignKey
ALTER TABLE "Users" ADD CONSTRAINT "Users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Telegram_Users" ADD CONSTRAINT "Telegram_Users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Code" ADD CONSTRAINT "Code_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reminders" ADD CONSTRAINT "Reminders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_difficulty_id_fkey" FOREIGN KEY ("difficulty_id") REFERENCES "Difficulty"("d_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryQuiz" ADD CONSTRAINT "CategoryQuiz_quizQuiz_id_fkey" FOREIGN KEY ("quizQuiz_id") REFERENCES "Quiz"("quiz_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CategoryQuiz" ADD CONSTRAINT "CategoryQuiz_categoryC_id_fkey" FOREIGN KEY ("categoryC_id") REFERENCES "Category"("c_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LimitationQuiz" ADD CONSTRAINT "LimitationQuiz_limitationL_id_fkey" FOREIGN KEY ("limitationL_id") REFERENCES "Limitation"("l_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LimitationQuiz" ADD CONSTRAINT "LimitationQuiz_quizQuiz_id_fkey" FOREIGN KEY ("quizQuiz_id") REFERENCES "Quiz"("quiz_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "Quiz"("quiz_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_questionsTypeQt_id_fkey" FOREIGN KEY ("questionsTypeQt_id") REFERENCES "QuestionsType"("qt_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Questions"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswors" ADD CONSTRAINT "UserAnswors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswors" ADD CONSTRAINT "UserAnswors_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "Questions"("question_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserAnswors" ADD CONSTRAINT "UserAnswors_answer_id_fkey" FOREIGN KEY ("answer_id") REFERENCES "Answers"("answer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
