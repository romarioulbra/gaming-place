/*
  Warnings:

  - Added the required column `categoria_jogo_id` to the `jogos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `jogos` ADD COLUMN `categoria_jogo_id` INTEGER NOT NULL,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE `jogos` ADD CONSTRAINT `jogos_categoria_jogo_id_fkey` FOREIGN KEY (`categoria_jogo_id`) REFERENCES `categoria_jogos`(`categoria_jogo_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
