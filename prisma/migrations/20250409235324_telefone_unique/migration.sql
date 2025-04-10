/*
  Warnings:

  - A unique constraint covering the columns `[telefone]` on the table `Pessoa` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_telefone_key" ON "Pessoa"("telefone");
