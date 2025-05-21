/*
  Warnings:

  - Added the required column `token_indicacao` to the `indicacao_amigo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `indicacao_amigo` ADD COLUMN `token_indicacao` VARCHAR(191) NOT NULL;
