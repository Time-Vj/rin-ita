-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Client" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tipo" TEXT NOT NULL,
    "nome" TEXT,
    "cognome" TEXT,
    "ragioneSociale" TEXT,
    "piva" TEXT,
    "cf" TEXT,
    "indirizzo" TEXT,
    "telefono" TEXT,
    "email" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "responsabileId" TEXT,
    "dataFineContratto" DATETIME,
    CONSTRAINT "Client_responsabileId_fkey" FOREIGN KEY ("responsabileId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Client" ("cf", "cognome", "createdAt", "email", "id", "indirizzo", "nome", "piva", "ragioneSociale", "responsabileId", "telefono", "tipo") SELECT "cf", "cognome", "createdAt", "email", "id", "indirizzo", "nome", "piva", "ragioneSociale", "responsabileId", "telefono", "tipo" FROM "Client";
DROP TABLE "Client";
ALTER TABLE "new_Client" RENAME TO "Client";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
