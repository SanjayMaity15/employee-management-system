const User = require("../models/User");
const Attendance = require("../models/Attendance");
const Leave = require("../models/Leave");

// GET /api/dashboard
exports.getDashboardStats = async (req, res) => {
	try {
		const user = req.user;

		// ================= EMPLOYEE DASHBOARD =================
		if (user.role === "employee") {
			// Total attendance records
			const totalDays = await Attendance.countDocuments({
				user: user._id,
			});

			// Present days
			const presentDays = await Attendance.countDocuments({
				user: user._id,
				status: "present",
			});

			// Approved leaves
			const approvedLeaves = await Leave.countDocuments({
				user: user._id,
				status: "approved",
			});


			// Assume yearly leave quota = 20
			const leaveBalance = Math.max(20 - approvedLeaves, 0);

			return res.json({
				totalDays,
				presentDays,
                leaveBalance,
                approvedLeaves
			});
		}

		// ================= ADMIN DASHBOARD =================
		if (user.role === "admin") {
			const totalEmployees = await User.countDocuments({
				role: "employee",
			});

			// Today's attendance
			const today = new Date();
			today.setHours(0, 0, 0, 0);

			const todayAttendance = await Attendance.countDocuments({
				date: { $gte: today },
			});

			// Pending leaves
			const pendingLeaves = await Leave.countDocuments({
				status: "pending",
			});

			return res.json({
				totalEmployees,
				todayAttendance,
				pendingLeaves,
			});
		}

		res.status(403).json({ message: "Unauthorized role" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Dashboard error" });
	}
};
