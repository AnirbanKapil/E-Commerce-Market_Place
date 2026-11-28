// prisma/seed.ts
// Imports realistic fake products (with real product photos) from DummyJSON
// into your Product table with INR prices, and attaches them to a "Demo Store".
//
// Run:  npx tsx prisma/seed.ts
//
// Safe to run more than once: products get fixed ids ("dummy-1", ...), existing
// rows are skipped, and any product that has no store yet is attached to the
// Demo Store (this backfills products you seeded before stores existed).

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma/client";

// Prisma 7 needs a driver adapter. If you are on Prisma 6, delete the adapter
// lines and use:  const prisma = new PrismaClient();
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
const SKIP_CATEGORIES = new Set(["vehicle", "motorcycle"]);

// "mens-shirts" -> "Men's Shirts", "home-decoration" -> "Home Decoration"
const prettyCategory = (slug: string) =>
  slug
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ")
    .replace(/^Mens\b/, "Men's")
    .replace(/^Womens\b/, "Women's");

// USD -> INR on the discounted price, ending in 9 like real store prices.
const toINR = (usd: number, discountPct: number) => {
  const inr = usd * USD_TO_INR * (1 - discountPct / 100);
  return Math.max(Math.round(inr / 10) * 10 - 1, 19);
};

async function main() {
  // A seller account + store that owns the demo products.
  // The demo user has no password, so nobody can log in as it.
  const demoUser = await prisma.user.upsert({
    where: { email: "demo-seller@example.com" },
    update: {},
    create: { email: "demo-seller@example.com", name: "Demo Seller", role: "SELLER" },
  });
  const demoStore = await prisma.store.upsert({
    where: { userId: demoUser.id },
    update: {},
    create: { name: "Demo Store", userId: demoUser.id },
  });

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
      storeId: demoStore.id,
    }));

  const created = await prisma.product.createMany({ data, skipDuplicates: true });
  const backfilled = await prisma.product.updateMany({
    where: { storeId: null },
    data: { storeId: demoStore.id },
  });
  console.log(
    `Seeded ${created.count} new products, attached ${backfilled.count} existing products to "${demoStore.name}".`
  );

  // Optional: make an existing user an ADMIN. Put SEED_ADMIN_EMAIL in your .env
  const adminEmail = process.env.SEED_ADMIN_EMAIL;
  if (adminEmail) {
    const r = await prisma.user.updateMany({
      where: { email: adminEmail },
      data: { role: "ADMIN" },
    });
    console.log(r.count ? `Made ${adminEmail} an ADMIN.` : `No user found with email ${adminEmail}.`);
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
