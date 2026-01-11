const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, enum: ["admin", "employee"], default: "employee" },
	designation: { type: String, default: "" },
	department: { type: String, default: "" },
	dateJoined: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
