/*
  Warnings:

  - A unique constraint covering the columns `[usuario_email]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `usuarios_usuario_email_key` ON `usuarios`(`usuario_email`);
