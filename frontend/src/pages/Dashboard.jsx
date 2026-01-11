import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
// import Summary from "../components/Summary";
import API from "../api/api";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const Dashboard = () => {
	const { user } = useContext(AuthContext);
	const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);


	const fetchDashboardData = async () => {
		try {
			const res = await API.get("/dashboard");
			setStats(res.data);
		} catch (err) {
			toast.error("Failed to load dashboard data");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchDashboardData();
	}, []);

	if (loading) {
		return (
            <Loader/>
		);
    }
    
    console.log(stats);
    

	return (
		<div>
			<Navbar />

			<div className="p-6 bg-gray-100 min-h-screen">
				{user.role === "admin" && (
					<h2 className="text-center font-bold text-2xl">
						Admin Panel
					</h2>
				)}

				<h1 className="text-2xl font-bold mb-6">
					Welcome, <span className="text-blue-600">{user.name}</span>
				</h1>

				<div className="pb-12">
					{user && (
						<div className="flex justify-center gap-6">
							<Link
								to="/dashboard"
								className="px-5 py-2 rounded-lg
                                bg-blue-100 text-blue-700 border border-blue-600
                                hover:bg-blue-200 transition font-medium"
							>
								Dashboard
							</Link>

							{user.role === "admin" && (
								<Link
									to="/employees"
									className="px-5 py-2 rounded-lg
                                    bg-purple-100 text-purple-700 border border-purple-600
                                    hover:bg-purple-200 transition font-medium"
								>
									Employees
								</Link>
							)}

							<Link
								to="/attendance"
								className="px-5 py-2 rounded-lg
                                bg-green-100 text-green-700 border border-green-600
                                hover:bg-green-200 transition font-medium"
							>
								Attendance
							</Link>

							<Link
								to="/leave"
								className="px-5 py-2 rounded-lg
                                bg-orange-100 text-orange-700 border border-orange-600
                                hover:bg-orange-200 transition font-medium"
							>
								Leave
							</Link>
						</div>
					)}
				</div>

				{/* ===== Stats Cards ===== */}
				<div className="grid md:grid-cols-3 justify-center items-center gap-6 mb-8">
					{user.role === "employee" && (
						<>
							<StatCard
								title="Total Working Days"
								value={stats.totalDays}
								color="black"
							/>
							<StatCard
								title="Present Days"
								value={stats.presentDays}
								color="green"
							/>
							<StatCard
								title="Aproved Leave"
								value={stats.approvedLeaves}
								color="blue"
							/>
							<StatCard
								title="Leave Balance"
								value={stats.leaveBalance}
								color="yellow"
							/>
						</>
					)}

					{user.role === "admin" && (
						<>
							<StatCard
								title="Total Employees"
								value={stats.totalEmployees}
								color="blue"
							/>
							<StatCard
								title="Today's Attendance"
								value={stats.todayAttendance}
								color="green"
							/>
							<StatCard
								title="Pending Leaves"
								value={stats.pendingLeaves}
								color="red"
							/>
						</>
					)}
				</div>


			</div>
		</div>
	);
};

const StatCard = ({ title, value = 0, color }) => {
	const colorMap = {
		blue: "text-blue-600",
		green: "text-green-600",
		yellow: "text-yellow-600",
		red: "text-red-600",
	};

	return (
		<div className="bg-white hover:border hover:border-green-400 p-6 rounded shadow text-center">
			<h3 className="text-gray-500">{title}</h3>
			<p className={`text-3xl font-bold mt-2 ${colorMap[color]}`}>
				{value}
			</p>
		</div>
	);
};

export default Dashboard;
