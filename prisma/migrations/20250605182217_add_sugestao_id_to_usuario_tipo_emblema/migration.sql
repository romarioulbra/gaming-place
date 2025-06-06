-- AlterTable
ALTER TABLE `usuario_tipo_emblema` ADD COLUMN `sugestao_id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `usuario_tipo_emblema` ADD CONSTRAINT `usuario_tipo_emblema_sugestao_id_fkey` FOREIGN KEY (`sugestao_id`) REFERENCES `sugestao_melhoria`(`sugestao_melhoria_id`) ON DELETE SET NULL ON UPDATE CASCADE;
