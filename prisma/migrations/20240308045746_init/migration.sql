-- CreateEnum
CREATE TYPE "BorrowStatus" AS ENUM ('BORROWED', 'RETURNED');

-- CreateTable
CREATE TABLE "Borrowers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "itemDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "BorrowStatus" NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Borrowers_id_key" ON "Borrowers"("id");
