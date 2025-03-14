/*
  Warnings:

  - The primary key for the `user` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `externalId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `_roletouser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Role` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `_roletouser` DROP FOREIGN KEY `_RoleToUser_A_fkey`;

-- DropForeignKey
ALTER TABLE `_roletouser` DROP FOREIGN KEY `_RoleToUser_B_fkey`;

-- AlterTable
ALTER TABLE `user` DROP PRIMARY KEY,
    DROP COLUMN `externalId`,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `_roletouser`;

-- CreateTable
CREATE TABLE `UserRole` (
    `userId` VARCHAR(191) NOT NULL,
    `roleId` VARCHAR(191) NOT NULL,
    `status` ENUM('REQUESTED', 'APPROVED', 'PROVOKED', 'REJECTED') NOT NULL DEFAULT 'REQUESTED',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `lastStatus` ENUM('REQUESTED', 'APPROVED', 'PROVOKED', 'REJECTED') NULL,
    `changedBy` VARCHAR(191) NULL,
    `changeNote` VARCHAR(191) NULL,

    PRIMARY KEY (`userId`, `roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Role_id_key` ON `Role`(`id`);

-- CreateIndex
CREATE UNIQUE INDEX `User_id_key` ON `User`(`id`);

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserRole` ADD CONSTRAINT `UserRole_changedBy_fkey` FOREIGN KEY (`changedBy`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
