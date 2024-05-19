/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `contractors` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "contractors" ADD COLUMN     "token" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "contractors_token_key" ON "contractors"("token");
