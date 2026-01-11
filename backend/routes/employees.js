const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
	getAllEmployees,
	getEmployee,
	createEmployee,
	updateEmployee,
	deleteEmployee,
} = require("../controllers/employeeController");

// Admin only
router
	.route("/")
	.get(protect(["admin"]), getAllEmployees)
	.post(protect(["admin"]), createEmployee);

// Admin or employee self
router
	.route("/:id")
	.get(protect(["admin", "employee"]), getEmployee)
	.put(protect(["admin"]), updateEmployee)
	.delete(protect(["admin"]), deleteEmployee);

module.exports = router;
