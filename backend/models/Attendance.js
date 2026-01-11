const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		date: {
			type: Date,
			required: true,
		},
		clockIn: Date,
		clockOut: Date,
		status: {
			type: String,
			enum: ["present", "absent"],
			default: "present",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
