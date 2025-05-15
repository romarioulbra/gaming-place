-- CreateTable
CREATE TABLE `tipo_emblemas` (
    `tipo_emblema_id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo_emblema_criterio` VARCHAR(191) NOT NULL,
    `tipo_emblema_pontos` INTEGER NOT NULL,
    `emblema_id` INTEGER NOT NULL,

    PRIMARY KEY (`tipo_emblema_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tipo_emblemas` ADD CONSTRAINT `tipo_emblemas_emblema_id_fkey` FOREIGN KEY (`emblema_id`) REFERENCES `emblemas`(`emblema_id`) ON DELETE CASCADE ON UPDATE CASCADE;
