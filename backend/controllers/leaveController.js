const Leave = require("../models/Leave");

/**
 * EMPLOYEE → apply leave
 */
exports.applyLeave = async (req, res) => {
	try {
		const { startDate, endDate, reason } = req.body;

		if (!startDate || !endDate || !reason) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const leave = await Leave.create({
			user: req.user._id,
			startDate,
			endDate,
			reason,
			status: "pending",
		});

		res.status(201).json(leave);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * ADMIN → approve / reject leave
 */
exports.updateLeaveStatus = async (req, res) => {
	try {
		let { status } = req.body;
		status = status.toLowerCase();

		if (!["approved", "rejected"].includes(status)) {
			return res.status(400).json({ message: "Invalid status" });
		}

		const leave = await Leave.findById(req.params.id);
		if (!leave) {
			return res.status(404).json({ message: "Leave not found" });
		}

		leave.status = status;
		await leave.save();

		res.json({ message: "Leave status updated", leave });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * ADMIN → get all leaves
 */
exports.getAllLeaves = async (req, res) => {
	try {
		const leaves = await Leave.find()
			.populate("user", "name email role")
			.sort({ createdAt: -1 });

		res.json(leaves);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
};

/**
 * EMPLOYEE → get only own leaves
 */
exports.getMyLeaves = async (req, res) => {
	try {
		const leaves = await Leave.find({ user: req.user._id }).sort({
			createdAt: -1,
		});

		res.json(leaves);
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error" });
	}
};
