/*
  Warnings:

  - Made the column `postId` on table `PostTags` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "PostTags" DROP CONSTRAINT "PostTags_postId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "dislikes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "likes" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PostTags" ALTER COLUMN "postId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "PostTags" ADD CONSTRAINT "PostTags_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
