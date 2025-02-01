-- CreateTable
CREATE TABLE `perfis` (
    `perfil_id` INTEGER NOT NULL AUTO_INCREMENT,
    `perfil_imagem` VARCHAR(191) NOT NULL,
    `perfil_cidade` VARCHAR(191) NOT NULL,
    `perfil_pontos` VARCHAR(191) NOT NULL,
    `perfil_nivel` VARCHAR(191) NOT NULL,
    `usuario_id` INTEGER NOT NULL,
    `emblema_id` INTEGER NOT NULL,

    PRIMARY KEY (`perfil_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `perfis` ADD CONSTRAINT `perfis_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `perfis` ADD CONSTRAINT `perfis_emblema_id_fkey` FOREIGN KEY (`emblema_id`) REFERENCES `emblemas`(`emblema_id`) ON DELETE CASCADE ON UPDATE CASCADE;
