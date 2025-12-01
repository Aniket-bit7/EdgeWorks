/*
  Warnings:

  - The `likes` column on the `Creations` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Creations" DROP COLUMN "likes",
ADD COLUMN     "likes" INTEGER[] DEFAULT ARRAY[]::INTEGER[];
