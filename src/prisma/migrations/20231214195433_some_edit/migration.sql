/*
  Warnings:

  - You are about to drop the column `is_onine` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `user` table. All the data in the column will be lost.
  - Added the required column `userName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `is_onine`,
    DROP COLUMN `name`,
    ADD COLUMN `isOnine` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `userName` VARCHAR(191) NOT NULL;
