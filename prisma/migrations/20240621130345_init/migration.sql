/*
  Warnings:

  - A unique constraint covering the columns `[user_tg_id]` on the table `Telegram_Users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Telegram_Users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Telegram_Users_user_tg_id_key" ON "Telegram_Users"("user_tg_id");

-- CreateIndex
CREATE UNIQUE INDEX "Telegram_Users_user_id_key" ON "Telegram_Users"("user_id");
