/*
  Warnings:

  - The primary key for the `role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `externalId` on the `role` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `_roletouser` DROP FOREIGN KEY `_RoleToUser_A_fkey`;

-- AlterTable
ALTER TABLE `_roletouser` MODIFY `A` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `role` DROP PRIMARY KEY,
    DROP COLUMN `externalId`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`name`);

-- AddForeignKey
ALTER TABLE `_RoleToUser` ADD CONSTRAINT `_RoleToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Role`(`name`) ON DELETE CASCADE ON UPDATE CASCADE;
