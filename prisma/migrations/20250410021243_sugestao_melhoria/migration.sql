-- CreateTable
CREATE TABLE `sugestao_melhoria` (
    `sugestao_melhoria_id` INTEGER NOT NULL AUTO_INCREMENT,
    `sugestao_melhoria_nome` VARCHAR(191) NOT NULL,
    `sugestao_melhoria_descricao` VARCHAR(254) NOT NULL,
    `sugestao_melhoria_status` VARCHAR(191) NOT NULL,
    `usuario_id` INTEGER NOT NULL,

    PRIMARY KEY (`sugestao_melhoria_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `sugestao_melhoria` ADD CONSTRAINT `sugestao_melhoria_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`usuario_id`) ON DELETE CASCADE ON UPDATE CASCADE;
