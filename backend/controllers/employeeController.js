const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get all employees (Admin)
exports.getAllEmployees = async (req, res) => {
	try {
		const employees = await User.find({ role: "employee" }).select(
			"-password"
		);
		res.json(employees);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Get single employee (Admin or Employee self)
exports.getEmployee = async (req, res) => {
	try {
		const employee = await User.findById(req.params.id).select("-password");
		if (!employee)
			return res.status(404).json({ message: "Employee not found" });
		res.json(employee);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};



// Create employee (Admin only)
exports.createEmployee = async (req, res) => {
	try {
		const { name, email, password, designation, department } = req.body;

		// ✅ Validate required fields
		if (!name || !email || !password) {
			return res
				.status(400)
				.json({ message: "Name, email and password are required" });
		}

		// ✅ Check if employee already exists
		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: "Employee already exists" });
		}

		// ✅ Hash password
		const hashedPassword = await bcrypt.hash(password, 10);

		// ✅ Create employee (force role = employee)
		const employee = await User.create({
			name,
			email,
			password: hashedPassword,
			role: "employee",
			designation,
			department,
		});

		// ❌ Do not send password back
		res.status(201).json({
			message: "Employee created successfully",
			employee: {
				_id: employee._id,
				name: employee.name,
				email: employee.email,
				role: employee.role,
				designation: employee.designation,
				department: employee.department,
			},
		});
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};


// Update employee
exports.updateEmployee = async (req, res) => {
	try {
		const employee = await User.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.json(employee);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
	try {
		await User.findByIdAndDelete(req.params.id);
		res.json({ message: "Employee deleted" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};
