-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Pessoa" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT,
    "telefone" TEXT,
    "dataNascimento" DATETIME,
    "endereco" TEXT
);
INSERT INTO "new_Pessoa" ("dataNascimento", "email", "endereco", "id", "nome", "senha", "telefone") SELECT "dataNascimento", "email", "endereco", "id", "nome", "senha", "telefone" FROM "Pessoa";
DROP TABLE "Pessoa";
ALTER TABLE "new_Pessoa" RENAME TO "Pessoa";
CREATE UNIQUE INDEX "Pessoa_email_key" ON "Pessoa"("email");
CREATE UNIQUE INDEX "Pessoa_telefone_key" ON "Pessoa"("telefone");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
