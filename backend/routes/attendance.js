const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
	clockIn,
	clockOut,
	getMyAttendance,
	getAllAttendance,
} = require("../controllers/attendanceController");

// Employee
router.post("/clockin", protect(["employee", "admin"]), clockIn);
router.post("/clockout", protect(["employee", "admin"]), clockOut);

// Attendance history
router.get("/my", protect(["employee"]), getMyAttendance);
router.get("/all", protect(["admin"]), getAllAttendance);

module.exports = router;
