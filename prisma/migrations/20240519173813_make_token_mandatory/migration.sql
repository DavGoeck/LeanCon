/*
  Warnings:

  - Made the column `token` on table `contractors` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "contractors" ALTER COLUMN "token" SET NOT NULL,
ALTER COLUMN "token" SET DEFAULT '';
