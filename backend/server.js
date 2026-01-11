const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const dashboardRoutes = require("./routes/dashboardRoutes");




dotenv.config();
connectDB();

const app = express();

app.use(
	cors({
		origin: process.env.FRONTEND_URL, // your frontend URL
		credentials: true, // if you use cookies
	})
);
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/employees", require("./routes/employees"));
app.use("/api/attendance", require("./routes/attendance"));
app.use("/api/leave", require("./routes/leave"));
app.use("/api/dashboard", dashboardRoutes);

// Default route
app.get("/", (req, res) => {
	res.send("Employee Management Backend Running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
