/*
  Warnings:

  - You are about to drop the column `categoria_jogo_alteracao` on the `categoria_jogos` table. All the data in the column will be lost.
  - You are about to drop the column `categoria_jogo_criacao` on the `categoria_jogos` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `categoria_jogos` DROP COLUMN `categoria_jogo_alteracao`,
    DROP COLUMN `categoria_jogo_criacao`;
