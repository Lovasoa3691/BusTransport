/*
  Warnings:

  - You are about to drop the column `id_driver` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `id_driver`,
    MODIFY `status` VARCHAR(20) NULL;
