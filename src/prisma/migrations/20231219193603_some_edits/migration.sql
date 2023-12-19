/*
  Warnings:

  - You are about to drop the column `receiverId` on the `message` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `Message_receiverId_fkey`;

-- AlterTable
ALTER TABLE `message` DROP COLUMN `receiverId`;
