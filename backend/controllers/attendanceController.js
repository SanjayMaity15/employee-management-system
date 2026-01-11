const Attendance = require("../models/Attendance");

/**
 * Utility: get today's date at 00:00:00
 */
const getToday = () => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	return today;
};

/**
 * ===============================
 * CLOCK IN
 * ===============================
 */
exports.clockIn = async (req, res) => {
	try {
		const today = getToday();

		const existing = await Attendance.findOne({
			user: req.user._id,
			date: today,
		});

		if (existing)
			return res
				.status(400)
				.json({ message: "Already clocked in today" });

		const attendance = await Attendance.create({
			user: req.user._id,
			date: today,
			clockIn: new Date(),
			status: "present",
		});

		res.status(201).json(attendance);
	} catch (err) {
		res.status(500).json({ message: "Server error", error: err.message });
	}
};

/**
 * ===============================
 * CLOCK OUT
 * ===============================
 */
exports.clockOut = async (req, res) => {
	try {
		const today = getToday();

		const attendance = await Attendance.findOne({
			user: req.user._id,
			date: today,
		});

		if (!attendance)
			return res
				.status(400)
				.json({ message: "No clock-in found for today" });

		if (attendance.clockOut)
			return res.status(400).json({ message: "Already clocked out" });

		attendance.clockOut = new Date();
		await attendance.save();

		res.json(attendance);
	} catch (err) {
		res.status(500).json({ message: "Server error", error: err.message });
	}
};

/**
 * ===============================
 * EMPLOYEE: MY ATTENDANCE
 * GET /api/attendance/my
 * ===============================
 */
exports.getMyAttendance = async (req, res) => {
	try {
		const records = await Attendance.find({
			user: req.user._id,
		}).sort({ date: -1 });

		res.json(records);
	} catch (err) {
		res.status(500).json({ message: "Server error", error: err.message });
	}
};

/**
 * ===============================
 * ADMIN: ALL ATTENDANCE
 * GET /api/attendance/all
 * ===============================
 */
exports.getAllAttendance = async (req, res) => {
	try {
		const records = await Attendance.find()
			.populate("user", "name email role")
			.sort({ date: -1 });

		res.json(records);
	} catch (err) {
		res.status(500).json({ message: "Server error", error: err.message });
	}
};
