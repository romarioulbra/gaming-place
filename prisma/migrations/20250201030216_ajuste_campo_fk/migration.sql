/*
  Warnings:

  - You are about to drop the column `emblema_id` on the `perfis` table. All the data in the column will be lost.
  - You are about to drop the column `usuario_id` on the `perfis` table. All the data in the column will be lost.
  - Added the required column `emblema` to the `perfis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuario` to the `perfis` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `perfis` DROP FOREIGN KEY `perfis_emblema_id_fkey`;

-- DropForeignKey
ALTER TABLE `perfis` DROP FOREIGN KEY `perfis_usuario_id_fkey`;

-- AlterTable
ALTER TABLE `perfis` DROP COLUMN `emblema_id`,
    DROP COLUMN `usuario_id`,
    ADD COLUMN `emblema` INTEGER NOT NULL,
    ADD COLUMN `usuario` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `perfis` ADD CONSTRAINT `perfis_usuario_fkey` FOREIGN KEY (`usuario`) REFERENCES `usuarios`(`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `perfis` ADD CONSTRAINT `perfis_emblema_fkey` FOREIGN KEY (`emblema`) REFERENCES `emblemas`(`emblema_id`) ON DELETE CASCADE ON UPDATE CASCADE;
