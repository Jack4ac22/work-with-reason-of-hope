-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NULL,

    UNIQUE INDEX `Role_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `externalId` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `fullName` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `dateOfBirth` VARCHAR(191) NULL,
    `profilePicture` VARCHAR(191) NULL,
    `lastLogin` DATETIME(3) NULL,
    `isActive` BOOLEAN NOT NULL DEFAULT true,
    `isVerified` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `lastUpdate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `twoFactorEnabled` BOOLEAN NOT NULL DEFAULT false,
    `twoFactorSecret` VARCHAR(191) NULL,
    `passwordResetToken` VARCHAR(191) NULL,
    `passwordResetExpiry` DATETIME(3) NULL,
    `country` VARCHAR(191) NULL,
    `state` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `postalCode` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `languagePreference` VARCHAR(191) NULL,
    `timezone` VARCHAR(191) NULL,
    `notificationPreferences` VARCHAR(191) NULL,
    `lastPasswordChange` DATETIME(3) NULL,
    `failedLoginAttempts` INTEGER NOT NULL DEFAULT 0,
    `accountLockedUntil` DATETIME(3) NULL,
    `lastActivity` DATETIME(3) NULL,
    `emailVerificationToken` VARCHAR(191) NULL,
    `emailVerificationExpiry` DATETIME(3) NULL,
    `phoneNumberVerified` BOOLEAN NOT NULL DEFAULT false,
    `bio` VARCHAR(191) NULL,
    `websiteUrl` VARCHAR(191) NULL,
    `customAttributes` VARCHAR(191) NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_RoleToUser` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_RoleToUser_AB_unique`(`A`, `B`),
    INDEX `_RoleToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_RoleToUser` ADD CONSTRAINT `_RoleToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RoleToUser` ADD CONSTRAINT `_RoleToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
