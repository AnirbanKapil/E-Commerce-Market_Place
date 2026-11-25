-- Add a required category field. Existing rows receive a placeholder so the
-- migration can run against databases that already contain products.
ALTER TABLE "Product" ADD COLUMN "category" TEXT NOT NULL DEFAULT 'Uncategorized';

-- New products must provide a category explicitly.
ALTER TABLE "Product" ALTER COLUMN "category" DROP DEFAULT;
