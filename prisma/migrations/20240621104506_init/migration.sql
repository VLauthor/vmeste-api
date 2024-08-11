/*
  Warnings:

  - Made the column `user_id` on table `Telegram_Users` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Telegram_Users" DROP CONSTRAINT "Telegram_Users_user_id_fkey";

-- AlterTable
ALTER TABLE "Telegram_Users" ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Telegram_Users" ADD CONSTRAINT "Telegram_Users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
