import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import API from "../api/api";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
	const { user } = useContext(AuthContext);
	const [attendance, setAttendance] = useState([]);
	    const navigate = useNavigate();

	// ✅ Fetch attendance based on role
	const fetchAttendance = async () => {
		try {
			const url =
				user.role === "admin" ? "/attendance/all" : "/attendance/my";

			const res = await API.get(url);
			setAttendance(res.data);

			// ✅ Only employee needs clock-in status
			// if (user.role === "employee") {
			// 	const today = new Date().toISOString().split("T")[0];
			// 	const todayRecord = res.data.find(
			// 		(rec) => rec.date && rec.date.split("T")[0] === today
			// 	);

			// 	setClockedIn(todayRecord?.clockIn && !todayRecord?.clockOut);
			// }
		} catch (err) {
			toast.error("Failed to fetch attendance");
		}
	};

	useEffect(() => {
		fetchAttendance();
	}, []);

	// ✅ Clock-in (Employee)
	const handleClockIn = async () => {
		try {
			await API.post("/attendance/clockin");
			toast.success("Clocked in successfully");
			setClockedIn(true);
			fetchAttendance();
		} catch (err) {
			toast.error(err.response?.data?.message || "Clock-in failed");
		}
	};

	// ✅ Clock-out (Employee)
	const handleClockOut = async () => {
		try {
			await API.post("/attendance/clockout");
			toast.success("Clocked out successfully");
			
			fetchAttendance();
		} catch (err) {
			toast.error(err.response?.data?.message || "Clock-out failed");
		}
	};

	console.log(attendance);

	return (
		<div>
			<Navbar />
			<div className="p-6 bg-gray-100 min-h-screen">
				<h2 className="text-2xl font-bold mb-6 text-center">
					Attendance
				</h2>

				{/* ✅ Clock-in / Clock-out (Employee only) */}
				{user.role === "employee" && (
					<div className="mb-6 flex gap-4">
						<button
							onClick={handleClockIn}
							className="px-5 py-2 rounded-lg
                                bg-green-100 text-green-700 border border-green-600
                                hover:bg-green-200 transition font-medium"
						>
							Clock In
						</button>

						<button
							onClick={handleClockOut}
							className="px-5 py-2 rounded-lg
                                bg-red-200 text-red-700 border border-red-600
                                hover:bg-red-200 transition font-medium"
						>
							Clock Out
						</button>
					</div>
				)}

				{/* ✅ Attendance Table */}
				<div className="bg-white shadow rounded p-4 overflow-x-auto">
					<table className="min-w-full table-auto">
						<thead>
							<tr className="bg-gray-200 text-center">
								{user.role === "admin" && (
									<th className="px-4 py-2 text-purple-600">
										Employee
									</th>
								)}
								<th className="px-4 py-2 text-orange-600">
									Date
								</th>
								<th className="px-4 py-2 text-green-600">
									Clock In
								</th>
								<th className="px-4 py-2 text-red-600">
									Clock Out
								</th>
								<th className="px-4 py-2 text-cyan-600">
									Status
								</th>
							</tr>
						</thead>

						<tbody>
							{attendance.map((record) => (
								<tr
									key={record._id}
									className="border-t text-center"
								>
									{user.role === "admin" && (
										<td className="px-4 py-2 text-purple-500 text-lg font-semibold">
											{record.user?.name}
										</td>
									)}
									<td className="px-4 py-2 text-orange-500">
										{new Date(
											record.date
										).toLocaleDateString()}
									</td>
									<td className="px-4 py-2 text-green-500">
										{record.clockIn
											? new Date(
													record.clockIn
											  ).toLocaleTimeString()
											: "-"}
									</td>
									<td className="px-4 py-2 text-red-500">
										{record.clockOut
											? new Date(
													record.clockOut
											  ).toLocaleTimeString()
											: "-"}
									</td>
									<td className="px-4 py-2 font-semibold text-cyan-500">
										{record.status || "Present"}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>

				<div className="flex justify-end mt-6">
					<button
						className="px-5
						py-2
						rounded-lg
						bg-red-100
						text-red-700
						border
						border-red-600
						hover:bg-red-200
						transition
						font-medium"
						onClick={() => navigate(-1)}
					>
						Go Back
					</button>
				</div>
			</div>
		</div>
	);
};

export default Attendance;
