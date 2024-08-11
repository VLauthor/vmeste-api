-- CreateTable
CREATE TABLE "Users" (
    "user_id" SERIAL NOT NULL,
    "last_name" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "patronomic" TEXT,
    "mail" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "gender" BOOLEAN NOT NULL DEFAULT true,
    "date_birthday" TIMESTAMP(3) NOT NULL,
    "password_hash" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Sessions" (
    "session_id" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "session_create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "Telegram_Users" (
    "node_id" SERIAL NOT NULL,
    "user_tg_id" BIGINT,
    "user_id" INTEGER,
    "first_name" TEXT,
    "last_name" TEXT,
    "username" TEXT,
    "key" TEXT,

    CONSTRAINT "Telegram_Users_pkey" PRIMARY KEY ("node_id")
);

-- CreateTable
CREATE TABLE "Code" (
    "node_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "key" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "date_create" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Code_pkey" PRIMARY KEY ("node_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_mail_key" ON "Users"("mail");

-- CreateIndex
CREATE UNIQUE INDEX "Users_nickname_key" ON "Users"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "Telegram_Users_key_key" ON "Telegram_Users"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Code_user_id_key" ON "Code"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Code_key_key" ON "Code"("key");

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Telegram_Users" ADD CONSTRAINT "Telegram_Users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Code" ADD CONSTRAINT "Code_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
