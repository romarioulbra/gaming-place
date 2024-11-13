-- CreateTable
CREATE TABLE `jogos` (
    `jogos_id` INTEGER NOT NULL AUTO_INCREMENT,
    `jogos_nome` VARCHAR(191) NOT NULL,
    `jogos_descricao` VARCHAR(191) NOT NULL,
    `jogos_link` VARCHAR(191) NOT NULL,
    `jogos_img` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`jogos_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `jogos` ADD CONSTRAINT `jogos_jogos_id_fkey` FOREIGN KEY (`jogos_id`) REFERENCES `categoria_jogos`(`categoria_jogo_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
