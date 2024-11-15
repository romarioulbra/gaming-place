/*
  Warnings:

  - You are about to drop the column `jogos_img` on the `jogos` table. All the data in the column will be lost.
  - Added the required column `jogos_url_img` to the `jogos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `jogos` DROP COLUMN `jogos_img`,
    ADD COLUMN `jogos_url_img` VARCHAR(191) NOT NULL;
