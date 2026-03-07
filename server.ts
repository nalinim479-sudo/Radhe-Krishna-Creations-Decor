import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, "database.sqlite");
const db = new Database(dbPath);

// Initialize database
db.exec(`
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    price REAL NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    featured INTEGER DEFAULT 0
  )
`);

// Insert dummy data if empty
const count = db.prepare("SELECT COUNT(*) as count FROM products").get() as { count: number };
if (count.count === 0) {
  const insert = db.prepare(
    "INSERT INTO products (title, price, category, description, image, featured) VALUES (?, ?, ?, ?, ?, ?)"
  );
  const dummyProducts = [
    {
      title: "Decorative Candles",
      price: 499,
      category: "Candles",
      description: "Hand-poured scented candles with elegant designs, perfect for gifting or home decor.",
      image: "https://picsum.photos/seed/candle/800/800",
      featured: 1,
    },
    {
      title: "Festive Wall Hanging",
      price: 1299,
      category: "Festive Decor",
      description: "Beautiful handcrafted wall hanging with traditional motifs to brighten up your festive space.",
      image: "https://picsum.photos/seed/wallhanging/800/800",
      featured: 1,
    },
    {
      title: "Pooja Decoration Set",
      price: 2499,
      category: "Pooja Decor",
      description: "Complete pooja decoration set including thali, diyas, and floral arrangements.",
      image: "https://picsum.photos/seed/pooja/800/800",
      featured: 1,
    },
    {
      title: "Handmade Flower Decor",
      price: 899,
      category: "Festive Decor",
      description: "Artificial yet realistic handmade flower garlands for elegant door and wall decorations.",
      image: "https://picsum.photos/seed/flower/800/800",
      featured: 1,
    },
    {
      title: "Decorative Diyas",
      price: 399,
      category: "Pooja Decor",
      description: "Set of 4 beautifully painted terracotta diyas for Diwali and other auspicious occasions.",
      image: "https://picsum.photos/seed/diya/800/800",
      featured: 1,
    },
    {
      title: "Premium Gift Hamper",
      price: 3499,
      category: "Gift Items",
      description: "A luxurious gift hamper containing assorted decor items, perfect for weddings and housewarmings.",
      image: "https://picsum.photos/seed/gift/800/800",
      featured: 1,
    },
  ];

  const insertMany = db.transaction((products) => {
    for (const p of products) {
      insert.run(p.title, p.price, p.category, p.description, p.image, p.featured);
    }
  });
  insertMany(dummyProducts);
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/products", (req, res) => {
    const products = db.prepare("SELECT * FROM products ORDER BY id DESC").all();
    res.json(products);
  });

  app.get("/api/products/:id", (req, res) => {
    const product = db.prepare("SELECT * FROM products WHERE id = ?").get(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  });

  app.post("/api/products", (req, res) => {
    const { title, price, category, description, image, featured } = req.body;
    try {
      const result = db
        .prepare(
          "INSERT INTO products (title, price, category, description, image, featured) VALUES (?, ?, ?, ?, ?, ?)"
        )
        .run(title, price, category, description, image, featured ? 1 : 0);
      res.status(201).json({ id: result.lastInsertRowid });
    } catch (error) {
      res.status(500).json({ error: "Failed to create product" });
    }
  });

  app.put("/api/products/:id", (req, res) => {
    const { title, price, category, description, image, featured } = req.body;
    try {
      db.prepare(
        "UPDATE products SET title = ?, price = ?, category = ?, description = ?, image = ?, featured = ? WHERE id = ?"
      ).run(title, price, category, description, image, featured ? 1 : 0, req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to update product" });
    }
  });

  app.delete("/api/products/:id", (req, res) => {
    try {
      db.prepare("DELETE FROM products WHERE id = ?").run(req.params.id);
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete product" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
