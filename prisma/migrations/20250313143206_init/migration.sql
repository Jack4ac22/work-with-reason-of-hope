/*
  Warnings:

  - The required column `externalId` was added to the `Role` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE `role` ADD COLUMN `externalId` VARCHAR(191) NOT NULL;
