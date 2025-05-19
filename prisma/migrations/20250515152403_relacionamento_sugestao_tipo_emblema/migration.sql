/*
  Warnings:

  - You are about to drop the column `sugestao_melhoria_titulo` on the `sugestao_melhoria` table. All the data in the column will be lost.
  - Added the required column `tipo_emblema_id` to the `sugestao_melhoria` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sugestao_melhoria` DROP COLUMN `sugestao_melhoria_titulo`,
    ADD COLUMN `tipo_emblema_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `sugestao_melhoria` ADD CONSTRAINT `sugestao_melhoria_tipo_emblema_id_fkey` FOREIGN KEY (`tipo_emblema_id`) REFERENCES `tipo_emblemas`(`tipo_emblema_id`) ON DELETE CASCADE ON UPDATE CASCADE;
