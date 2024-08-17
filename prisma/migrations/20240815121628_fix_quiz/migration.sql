/*
  Warnings:

  - Added the required column `author_id` to the `Quiz` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "author_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
