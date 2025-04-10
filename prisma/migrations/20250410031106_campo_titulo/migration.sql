/*
  Warnings:

  - Added the required column `sugestao_melhoria_titulo` to the `sugestao_melhoria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sugestao_melhoria` ADD COLUMN `sugestao_melhoria_titulo` VARCHAR(191) NOT NULL;
