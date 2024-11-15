-- DropForeignKey
ALTER TABLE `jogos` DROP FOREIGN KEY `jogos_jogos_id_fkey`;

-- AlterTable
ALTER TABLE `jogos` MODIFY `jogos_url_img` VARCHAR(191) NULL;
