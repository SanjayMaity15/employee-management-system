const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
	applyLeave,
	updateLeaveStatus,
	getAllLeaves,
	getMyLeaves,
} = require("../controllers/leaveController");

// Employee applies leave
router.post("/", protect(["employee", "admin"]), applyLeave);

// Employee fetches ONLY own leaves
router.get("/my", protect(["employee"]), getMyLeaves);

// Admin fetches ALL leaves
router.get("/all", protect(["admin"]), getAllLeaves);

// Admin approves/rejects leave
router.put("/:id", protect(["admin"]), updateLeaveStatus);

module.exports = router;
