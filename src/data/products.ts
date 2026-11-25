// data/products.ts
// Fake products for development. All prices are in INR (whole rupees).
// Brands are fictional. Images come from picsum.photos (random placeholder
// photos, seeded by slug so each product always gets the same image).

export type Product = {
  slug: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  price: number; // selling price (INR)
  mrp: number; // original price (INR)
  stock: number;
  rating: number; // 0-5
  imageUrl: string;
  merchantId: string; // which merchant owns this product
  isActive: boolean; // only active products show to customers
};

// Replace these with real merchant user IDs from your DB.
export const MERCHANT_IDS = ["merchant_1", "merchant_2"];

const slugify = (s: string) =>
  s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

type Seed = Omit<Product, "slug" | "imageUrl" | "merchantId" | "isActive">;

const seed: Seed[] = [
  // ---------- Electronics ----------
  {
    name: "Sonix Wireless Bluetooth Headphones",
    description: "Over-ear headphones with 40 hours playback, deep bass and a built-in mic.",
    category: "Electronics",
    brand: "Sonix",
    price: 1499,
    mrp: 3999,
    stock: 45,
    rating: 4.3,
  },
  {
    name: "Zenith Smartwatch 1.83 inch Display",
    description: "Bluetooth calling, heart-rate and SpO2 tracking, 100+ sports modes.",
    category: "Electronics",
    brand: "Zenith",
    price: 2299,
    mrp: 5999,
    stock: 30,
    rating: 4.1,
  },
  {
    name: "VoltEdge 20000mAh Power Bank",
    description: "22.5W fast charging, dual USB output and a Type-C port.",
    category: "Electronics",
    brand: "VoltEdge",
    price: 1299,
    mrp: 2499,
    stock: 80,
    rating: 4.4,
  },
  {
    name: "PixelPro 1080p Full HD Webcam",
    description: "Auto light correction, noise-cancelling mic, plug and play over USB.",
    category: "Electronics",
    brand: "PixelPro",
    price: 1799,
    mrp: 3299,
    stock: 25,
    rating: 4.0,
  },
  {
    name: "TypeMate Mechanical Gaming Keyboard",
    description: "Hot-swappable blue switches with RGB backlight and an aluminium top plate.",
    category: "Electronics",
    brand: "TypeMate",
    price: 2999,
    mrp: 4999,
    stock: 18,
    rating: 4.5,
  },

  // ---------- Fashion ----------
  {
    name: "Men's Cotton Round Neck T-Shirt (Pack of 2)",
    description: "Soft 100% cotton, regular fit, available in multiple colours.",
    category: "Fashion",
    brand: "UrbanThread",
    price: 599,
    mrp: 1299,
    stock: 120,
    rating: 4.2,
  },
  {
    name: "Women's Printed Cotton Kurti",
    description: "Straight-fit kurti with 3/4 sleeves and a floral block print.",
    category: "Fashion",
    brand: "Rangoli",
    price: 799,
    mrp: 1999,
    stock: 70,
    rating: 4.3,
  },
  {
    name: "Men's Slim Fit Stretch Denim Jeans",
    description: "Mid-rise slim fit with comfort stretch, dark wash.",
    category: "Fashion",
    brand: "UrbanThread",
    price: 1199,
    mrp: 2799,
    stock: 60,
    rating: 4.1,
  },
  {
    name: "Men's Lightweight Running Shoes",
    description: "Breathable mesh upper with a cushioned EVA sole for daily runs.",
    category: "Fashion",
    brand: "StrideX",
    price: 1899,
    mrp: 3999,
    stock: 40,
    rating: 4.2,
  },
  {
    name: "Women's Faux Leather Handbag",
    description: "Spacious handbag with a zip closure, inner pockets and a detachable strap.",
    category: "Fashion",
    brand: "Rangoli",
    price: 1099,
    mrp: 2499,
    stock: 35,
    rating: 4.0,
  },

  // ---------- Home & Kitchen ----------
  {
    name: "Stainless Steel Water Bottle 1 Litre",
    description: "Double-wall insulated, keeps drinks cold for 24 hours and hot for 12.",
    category: "Home & Kitchen",
    brand: "HomeNest",
    price: 449,
    mrp: 899,
    stock: 150,
    rating: 4.4,
  },
  {
    name: "Non-Stick Cookware Set (3 Pieces)",
    description: "Induction-friendly kadhai, tawa and frying pan with cool-touch handles.",
    category: "Home & Kitchen",
    brand: "KitchenKart",
    price: 1599,
    mrp: 3499,
    stock: 28,
    rating: 4.2,
  },
  {
    name: "Cotton Double Bedsheet with 2 Pillow Covers",
    description: "180 TC pure cotton, fade-resistant print, fits a queen-size bed.",
    category: "Home & Kitchen",
    brand: "HomeNest",
    price: 699,
    mrp: 1599,
    stock: 90,
    rating: 4.3,
  },
  {
    name: "Rechargeable LED Study Table Lamp",
    description: "3 colour modes, touch dimmer, foldable arm and a 1800mAh battery.",
    category: "Home & Kitchen",
    brand: "Lumio",
    price: 549,
    mrp: 1199,
    stock: 65,
    rating: 4.1,
  },
  {
    name: "Electric Kettle 1.5 Litre",
    description: "Stainless steel body with auto shut-off and boil-dry protection.",
    category: "Home & Kitchen",
    brand: "KitchenKart",
    price: 799,
    mrp: 1695,
    stock: 55,
    rating: 4.3,
  },

  // ---------- Beauty & Personal Care ----------
  {
    name: "Vitamin C Face Serum 30ml",
    description: "10% Vitamin C with hyaluronic acid for a brighter, even-toned look.",
    category: "Beauty & Personal Care",
    brand: "GlowLeaf",
    price: 349,
    mrp: 699,
    stock: 100,
    rating: 4.2,
  },
  {
    name: "Herbal Hair Oil 200ml",
    description: "Blend of amla, bhringraj and coconut oil, with no mineral oil.",
    category: "Beauty & Personal Care",
    brand: "Ayuvana",
    price: 249,
    mrp: 450,
    stock: 140,
    rating: 4.4,
  },
  {
    name: "Men's Cordless Beard Trimmer",
    description: "USB rechargeable, 40 length settings and 90 minutes runtime.",
    category: "Beauty & Personal Care",
    brand: "TrimPro",
    price: 999,
    mrp: 1999,
    stock: 50,
    rating: 4.2,
  },
  {
    name: "Sunscreen SPF 50 PA+++ 50g",
    description: "Lightweight, non-greasy, no white cast; suitable for all skin types.",
    category: "Beauty & Personal Care",
    brand: "GlowLeaf",
    price: 399,
    mrp: 650,
    stock: 85,
    rating: 4.3,
  },
  {
    name: "Aloe Vera Gel Face Wash 100ml",
    description: "Gentle daily cleanser that removes oil and dirt without drying the skin.",
    category: "Beauty & Personal Care",
    brand: "Ayuvana",
    price: 199,
    mrp: 349,
    stock: 160,
    rating: 4.1,
  },

  // ---------- Sports & Fitness ----------
  {
    name: "Anti-Skid Yoga Mat 6mm",
    description: "Extra-thick NBR foam mat with a carry strap, 183 x 61 cm.",
    category: "Sports & Fitness",
    brand: "FitNova",
    price: 499,
    mrp: 1199,
    stock: 75,
    rating: 4.3,
  },
  {
    name: "Adjustable Dumbbell Set 20kg",
    description: "Four plates with anti-rust coating, plus rods and star-lock collars.",
    category: "Sports & Fitness",
    brand: "FitNova",
    price: 1999,
    mrp: 3499,
    stock: 22,
    rating: 4.4,
  },
  {
    name: "Badminton Racket Set (2 Rackets + 3 Shuttles)",
    description: "Lightweight aluminium rackets with grip tape and a carry bag.",
    category: "Sports & Fitness",
    brand: "SmashUp",
    price: 899,
    mrp: 1799,
    stock: 48,
    rating: 4.0,
  },
  {
    name: "Speed Skipping Rope with Ball Bearings",
    description: "Adjustable steel-wire rope with foam handles for cardio workouts.",
    category: "Sports & Fitness",
    brand: "FitNova",
    price: 249,
    mrp: 499,
    stock: 130,
    rating: 4.2,
  },
  {
    name: "Football Size 5 (Machine Stitched)",
    description: "Durable PU cover, suitable for grass and turf.",
    category: "Sports & Fitness",
    brand: "SmashUp",
    price: 599,
    mrp: 1199,
    stock: 60,
    rating: 4.1,
  },
];

export const products: Product[] = seed.map((p, i) => ({
  ...p,
  slug: slugify(p.name),
  imageUrl: `https://picsum.photos/seed/${slugify(p.name)}/600/600`,
  merchantId: MERCHANT_IDS[i % MERCHANT_IDS.length],
  isActive: true,
}));

// ---------------------------------------------------------------------------
// Data-access helpers. Pages should only call these, never import `products`
// directly. When you move to a real DB, rewrite just these functions.
// ---------------------------------------------------------------------------

export async function getAllProducts(category?: string): Promise<Product[]> {
  return products.filter(
    (p) => p.isActive && (!category || p.category === category)
  );
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return products.find((p) => p.slug === slug && p.isActive) ?? null;
}

export async function getProductsByMerchant(merchantId: string): Promise<Product[]> {
  return products.filter((p) => p.merchantId === merchantId);
}

export async function getCategories(): Promise<string[]> {
  return [...new Set(products.map((p) => p.category))];
}

export const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export const discountPercent = (p: Pick<Product, "price" | "mrp">) =>
  Math.round(((p.mrp - p.price) / p.mrp) * 100);
