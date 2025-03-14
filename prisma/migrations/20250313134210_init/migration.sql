-- AlterTable
ALTER TABLE `user` ADD COLUMN `loginToken` VARCHAR(191) NULL,
    ADD COLUMN `loginTokenExpiry` DATETIME(3) NULL,
    MODIFY `isActive` BOOLEAN NOT NULL DEFAULT false;
