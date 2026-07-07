/*
  Warnings:

  - You are about to drop the column `route_path` on the `Line` table. All the data in the column will be lost.
  - Added the required column `road_path` to the `Line` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Line` DROP COLUMN `route_path`,
    ADD COLUMN `road_path` JSON NOT NULL;
