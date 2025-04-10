-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Cliente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cpfOuCnpj" TEXT,
    CONSTRAINT "Cliente_id_fkey" FOREIGN KEY ("id") REFERENCES "Pessoa" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Cliente" ("cpfOuCnpj", "id") SELECT "cpfOuCnpj", "id" FROM "Cliente";
DROP TABLE "Cliente";
ALTER TABLE "new_Cliente" RENAME TO "Cliente";
CREATE UNIQUE INDEX "Cliente_cpfOuCnpj_key" ON "Cliente"("cpfOuCnpj");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
