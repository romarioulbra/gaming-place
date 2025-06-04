/*
  Warnings:

  - You are about to drop the column `emblemas_pontos` on the `emblemas` table. All the data in the column will be lost.
  - Added the required column `emblemas_pontos_atuais` to the `emblemas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emblemas_pontos_total` to the `emblemas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `emblemas` DROP COLUMN `emblemas_pontos`,
    ADD COLUMN `emblemas_pontos_atuais` VARCHAR(191) NOT NULL,
    ADD COLUMN `emblemas_pontos_total` VARCHAR(191) NOT NULL;
