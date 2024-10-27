-- CreateTable
CREATE TABLE `usuarios` (
    `usuario_id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_nome` VARCHAR(191) NOT NULL,
    `usuario_email` VARCHAR(191) NOT NULL,
    `usuario_senha` VARCHAR(191) NOT NULL,
    `usuario_nivel` VARCHAR(191) NOT NULL,
    `usuario_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usuario_alteracao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`usuario_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
