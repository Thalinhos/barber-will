-- CreateTable
CREATE TABLE "Pessoa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "telefone" TEXT,
    "dataNascimento" DATETIME NOT NULL,
    "endereco" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpfOuCnpj" TEXT NOT NULL,
    CONSTRAINT "Cliente_id_fkey" FOREIGN KEY ("id") REFERENCES "Pessoa" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Lojista" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cnpj" TEXT NOT NULL,
    "dadosBancarios" TEXT NOT NULL,
    CONSTRAINT "Lojista_id_fkey" FOREIGN KEY ("id") REFERENCES "Pessoa" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_email_key" ON "Pessoa"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_cpfOuCnpj_key" ON "Cliente"("cpfOuCnpj");

-- CreateIndex
CREATE UNIQUE INDEX "Lojista_cnpj_key" ON "Lojista"("cnpj");
