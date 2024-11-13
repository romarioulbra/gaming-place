-- CreateTable
CREATE TABLE `categoria_jogos` (
    `categoria_jogo_id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoria_jogo_area_atuacao` VARCHAR(191) NOT NULL,
    `categoria_jogo_criacao` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `categoria_jogo_alteracao` DATETIME(3) NOT NULL,

    PRIMARY KEY (`categoria_jogo_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
