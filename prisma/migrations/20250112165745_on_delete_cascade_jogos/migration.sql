-- DropForeignKey
ALTER TABLE `jogos` DROP FOREIGN KEY `jogos_categoria_jogo_id_fkey`;

-- AddForeignKey
ALTER TABLE `jogos` ADD CONSTRAINT `jogos_categoria_jogo_id_fkey` FOREIGN KEY (`categoria_jogo_id`) REFERENCES `categoria_jogos`(`categoria_jogo_id`) ON DELETE CASCADE ON UPDATE CASCADE;
