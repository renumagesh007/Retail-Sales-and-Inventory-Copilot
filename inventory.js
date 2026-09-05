import { Router } from "express";
import { PRODUCTS } from "../data/mockData.js";
import { inventoryAlerts, stockValue } from "../utils/insights.js";

const router = Router();

// GET /api/inventory
router.get("/", (req, res) => {
  res.json(PRODUCTS);
});

// GET /api/inventory/alerts
router.get("/alerts", (req, res) => {
  res.json(inventoryAlerts());
});

// GET /api/inventory/summary
router.get("/summary", (req, res) => {
  const total = PRODUCTS.length;
  const lowStock = PRODUCTS.filter((p) => p.status === "low_stock").length;
  const outOfStock = PRODUCTS.filter((p) => p.status === "out_of_stock").length;
  res.json({
    totalSkus: total,
    lowStock,
    outOfStock,
    healthy: total - lowStock - outOfStock,
    stockValue: stockValue(),
  });
});

export default router;
