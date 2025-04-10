-- CreateTable
CREATE TABLE "Produto" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "valor" REAL NOT NULL,
    "lojistaid" INTEGER NOT NULL,
    CONSTRAINT "Produto_lojistaid_fkey" FOREIGN KEY ("lojistaid") REFERENCES "Lojista" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
