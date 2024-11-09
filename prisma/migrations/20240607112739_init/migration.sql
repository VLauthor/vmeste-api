/*
  Warnings:

  - You are about to drop the column `code` on the `Code` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[number]` on the table `Users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `number` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Code_key_key";

-- AlterTable
ALTER TABLE "Code" DROP COLUMN "code";

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "number" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Users_number_key" ON "Users"("number");
