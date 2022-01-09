/*
  Warnings:

  - Added the required column `description` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "description" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "PostTags" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "lube" TEXT NOT NULL,
    "film" TEXT NOT NULL,
    "postId" TEXT,

    CONSTRAINT "PostTags_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PostTags" ADD CONSTRAINT "PostTags_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
