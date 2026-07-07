/*
  Warnings:

  - Added the required column `modele` to the `Bus` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Bus` ADD COLUMN `modele` VARCHAR(20) NOT NULL;
