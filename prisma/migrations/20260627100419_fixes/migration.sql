/*
  Warnings:

  - You are about to drop the column `tafe` on the `post` table. All the data in the column will be lost.
  - You are about to drop the column `thummbnail` on the `post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "post" DROP COLUMN "tafe",
DROP COLUMN "thummbnail",
ADD COLUMN     "tags" TEXT[],
ADD COLUMN     "thumbnail" TEXT;
