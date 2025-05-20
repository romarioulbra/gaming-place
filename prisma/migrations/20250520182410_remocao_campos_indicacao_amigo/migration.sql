/*
  Warnings:

  - You are about to drop the column `indicacao_amigo_alteracao` on the `indicacao_amigo` table. All the data in the column will be lost.
  - You are about to drop the column `indicacao_amigo_criacao` on the `indicacao_amigo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `indicacao_amigo` DROP COLUMN `indicacao_amigo_alteracao`,
    DROP COLUMN `indicacao_amigo_criacao`;
