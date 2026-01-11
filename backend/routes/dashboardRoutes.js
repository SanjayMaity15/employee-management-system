const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getDashboardStats } = require("../controllers/dashboardController");

// Admin & Employee
router.get("/", protect(["admin", "employee"]), getDashboardStats);

module.exports = router;
