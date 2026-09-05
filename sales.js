import { Router } from "express";
import { dailyTrend, salesSummary, topProducts, categoryBreakdown } from "../utils/insights.js";

const router = Router();

// GET /api/sales/summary?days=30
router.get("/summary", (req, res) => {
  const days = Number(req.query.days) || 30;
  res.json(salesSummary(days));
});

// GET /api/sales/trend?days=30
router.get("/trend", (req, res) => {
  const days = Number(req.query.days) || 30;
  res.json(dailyTrend(days));
});

// GET /api/sales/top-products?days=30&limit=5
router.get("/top-products", (req, res) => {
  const days = Number(req.query.days) || 30;
  const limit = Number(req.query.limit) || 5;
  res.json(topProducts(days, limit));
});

// GET /api/sales/by-category?days=30
router.get("/by-category", (req, res) => {
  const days = Number(req.query.days) || 30;
  res.json(categoryBreakdown(days));
});

export default router;
