-- DropForeignKey
ALTER TABLE "contractors" DROP CONSTRAINT "contractors_projectId_fkey";

-- AddForeignKey
ALTER TABLE "contractors" ADD CONSTRAINT "contractors_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;
