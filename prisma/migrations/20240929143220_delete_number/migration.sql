/*
  Warnings:

  - You are about to drop the column `number` on the `Users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Users_number_key";

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "number";
