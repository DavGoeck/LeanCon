-- Overwrite default slugs
UPDATE "projects" SET slug = lower(regexp_replace(title, '\s+', '-', 'g'));

-- AlterTable
ALTER TABLE "projects" ALTER COLUMN "slug" DROP DEFAULT;
