-- CreateTable
CREATE TABLE `indicacao_amigo` (
    `indicacao_amigo_id` INTEGER NOT NULL AUTO_INCREMENT,
    `usuario_indicador_id` INTEGER NOT NULL,
    `indicacao_amigo_email_indicador` VARCHAR(191) NOT NULL,
    `indicacao_amigo_email_indicado` VARCHAR(191) NOT NULL,
    `status_convite` ENUM('ENVIADO', 'RECEBIDO', 'CADASTRADO') NOT NULL DEFAULT 'ENVIADO',
    `data_indicacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `indicacao_amigo_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `indicacao_amigo_alteracao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`indicacao_amigo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `indicacao_amigo` ADD CONSTRAINT `indicacao_amigo_usuario_indicador_id_fkey` FOREIGN KEY (`usuario_indicador_id`) REFERENCES `usuarios`(`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE;
