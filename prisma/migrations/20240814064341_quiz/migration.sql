/*
  Warnings:

  - You are about to drop the column `ptrivate` on the `Quiz` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Quiz" DROP COLUMN "ptrivate",
ADD COLUMN     "private" BOOLEAN NOT NULL DEFAULT false;
