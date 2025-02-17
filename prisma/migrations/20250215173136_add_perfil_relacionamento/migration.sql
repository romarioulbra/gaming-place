/*
  Warnings:

  - You are about to alter the column `perfil_pontos` on the `perfis` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `perfil_nivel` on the `perfis` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `perfis` MODIFY `perfil_pontos` INTEGER NOT NULL DEFAULT 0,
    MODIFY `perfil_nivel` INTEGER NOT NULL DEFAULT 1;
