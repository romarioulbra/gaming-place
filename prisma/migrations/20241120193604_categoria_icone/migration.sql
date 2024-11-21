/*
  Warnings:

  - Added the required column `categoria_jogo_icone` to the `categoria_jogos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `categoria_jogos` ADD COLUMN `categoria_jogo_icone` VARCHAR(191) NOT NULL;
