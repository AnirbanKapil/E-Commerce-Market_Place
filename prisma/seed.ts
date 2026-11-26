// prisma/seed.ts
// Imports realistic fake products (with real product photos) from DummyJSON
// into your Product table, with prices converted to INR.
//
// Run:  npx tsx prisma/seed.ts
//
// Safe to run more than once: each product gets a fixed id ("dummy-1",
// "dummy-2", ...) and existing rows are skipped, so carts and orders are
// never touched.

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

// Prisma 7 needs a driver adapter. If you are on Prisma 6, delete the adapter
// lines and use:  const prisma = new PrismaClient();
// If you already have a shared client (e.g. lib/prisma.ts), import it instead.
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

type DummyProduct = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number; // USD
  discountPercentage: number;
  stock: number;
  images?: string[];
  thumbnail?: string;
};

const USD_TO_INR = 88; // approximate rate, change it if you like

// Categories that look odd in a general store.
const SKIP_CATEGORIES = new Set(["vehicle", "motorcycle"]);

// "mens-shirts" -> "Men's Shirts", "home-decoration" -> "Home Decoration"
const prettyCategory = (slug: string) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    .replace(/^Mens\b/, "Men's")
    .replace(/^Womens\b/, "Women's");

// USD -> INR on the discounted price, ending in 9 like real store prices
// (e.g. 1499, 799). Whole rupees only.
const toINR = (usd: number, discountPct: number) => {
  const inr = usd * USD_TO_INR * (1 - discountPct / 100);
  return Math.max(Math.round(inr / 10) * 10 - 1, 19);
};

async function main() {
  const res = await fetch("https://dummyjson.com/products?limit=0");
  if (!res.ok) throw new Error(`DummyJSON request failed: ${res.status}`);
  const { products } = (await res.json()) as { products: DummyProduct[] };

  const data = products
    .filter((p) => !SKIP_CATEGORIES.has(p.category))
    .map((p) => ({
      id: `dummy-${p.id}`,
      name: p.title,
      description: p.description,
      category: prettyCategory(p.category),
      price: toINR(p.price, p.discountPercentage),
      imageUrl: p.images?.[0] ?? p.thumbnail ?? null,
      stock: p.stock,
    }));

  const result = await prisma.product.createMany({
    data,
    skipDuplicates: true,
  });
  console.log(
    `Seeded ${result.count} products (${data.length - result.count} already existed).`
  );

  // Optional: make an existing user the merchant/admin.
  // Put SEED_ADMIN_EMAIL=you@example.com in your .env
  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  if (adminEmail) {
    const r = await prisma.user.updateMany({
      where: { email: adminEmail },
      data: { role: "ADMIN" },
    });
    console.log(
      r.count
        ? `Made ${adminEmail} an ADMIN.`
        : `No user found with email ${adminEmail}.`
    );
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });