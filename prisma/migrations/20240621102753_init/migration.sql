/*
  Warnings:

  - You are about to drop the column `key` on the `Telegram_Users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Telegram_Users_key_key";

-- AlterTable
ALTER TABLE "Telegram_Users" DROP COLUMN "key",
ADD COLUMN     "bio" TEXT,
ADD COLUMN     "photo_max_url" TEXT,
ADD COLUMN     "photo_medium_url" TEXT,
ADD COLUMN     "photo_mini_url" TEXT;
