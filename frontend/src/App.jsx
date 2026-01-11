import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";

import Login from "./pages/Login";

import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
import Leave from "./pages/Leave";
import EmployeeList from "./pages/EmployeeList";
import Profile from "./pages/Profile";

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
	return (
		<Router>
			<Routes>
				{/* Default Route */}
				<Route path="/" element={<Navigate to="/login" />} />

				{/* Public Routes */}
				<Route path="/login" element={<Login />} />
				

				{/* Protected Routes */}
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/attendance"
					element={
						<ProtectedRoute allowedRoles={["employee", "admin"]}>
							<Attendance />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/leave"
					element={
						<ProtectedRoute allowedRoles={["employee", "admin"]}>
							<Leave />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/employees"
					element={
						<ProtectedRoute allowedRoles={["admin"]}>
							<EmployeeList />
						</ProtectedRoute>
					}
				/>

				<Route
					path="/profile"
					element={
						<ProtectedRoute allowedRoles={["employee", "admin"]}>
							<Profile />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;
