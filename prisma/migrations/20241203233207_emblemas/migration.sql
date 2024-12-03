-- CreateTable
CREATE TABLE `emblemas` (
    `emblema_id` INTEGER NOT NULL AUTO_INCREMENT,
    `emblema_nome` VARCHAR(191) NOT NULL,
    `emblema_criterio` VARCHAR(191) NOT NULL,
    `emblema_imagem` VARCHAR(191) NOT NULL,
    `emblemas_pontos` VARCHAR(191) NOT NULL,
    `emblemas_status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`emblema_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
