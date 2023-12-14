/*
  Warnings:

  - You are about to drop the column `isOnine` on the `user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `user` DROP COLUMN `isOnine`,
    ADD COLUMN `isOnline` BOOLEAN NOT NULL DEFAULT false;
