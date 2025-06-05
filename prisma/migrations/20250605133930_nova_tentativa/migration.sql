/*
  Warnings:

  - You are about to drop the column `emblemas_pontos_atuais` on the `emblemas` table. All the data in the column will be lost.
  - You are about to drop the column `emblemas_pontos_total` on the `emblemas` table. All the data in the column will be lost.
  - Added the required column `emblemas_pontos` to the `emblemas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `emblemas` DROP COLUMN `emblemas_pontos_atuais`,
    DROP COLUMN `emblemas_pontos_total`,
    ADD COLUMN `emblemas_pontos` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `usuario_tipo_emblema` (
    `usuario_emblema_id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuarioId` INTEGER NOT NULL,
    `tipoEmblemaId` INTEGER NOT NULL,
    `usuario_emblema_pontos` INTEGER NOT NULL DEFAULT 0,
    `usuario_emblema_status` ENUM('BLOQUEADO', 'DESBLOQUEADO') NOT NULL DEFAULT 'DESBLOQUEADO',

    UNIQUE INDEX `usuario_tipo_emblema_usuarioId_tipoEmblemaId_key`(`usuarioId`, `tipoEmblemaId`),
    PRIMARY KEY (`usuario_emblema_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `usuario_tipo_emblema` ADD CONSTRAINT `usuario_tipo_emblema_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `usuarios`(`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usuario_tipo_emblema` ADD CONSTRAINT `usuario_tipo_emblema_tipoEmblemaId_fkey` FOREIGN KEY (`tipoEmblemaId`) REFERENCES `tipo_emblemas`(`tipo_emblema_id`) ON DELETE CASCADE ON UPDATE CASCADE;
