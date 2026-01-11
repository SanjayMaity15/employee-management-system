const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate JWT
const generateToken = (user) =>
	jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
		expiresIn: "7d",
	});

// Signup
exports.signup = async (req, res) => {
	const { name, email, password, role } = req.body;

	try {
		// Check if user already exists
		const userExists = await User.findOne({ email });
		if (userExists)
			return res.status(400).json({ message: "Email already exists" });

		// Hash the password here
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create user with hashed password
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
			role,
		});

		// Generate JWT
		const token = generateToken(user);

		res.status(201).json({ token, user });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error", error: err.message });
	}
};

// Login
exports.login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });
		if (!user)
			return res.status(400).json({ message: "Invalid credentials" });

		// Compare password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch)
			return res.status(400).json({ message: "Invalid credentials" });

		const token = generateToken(user);
		res.json({ token, user });
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: "Server error", error: err.message });
	}
};
