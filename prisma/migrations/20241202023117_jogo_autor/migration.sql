/*
  Warnings:

  - Added the required column `jogos_autor` to the `jogos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `jogos` ADD COLUMN `jogos_autor` VARCHAR(191) NOT NULL;
