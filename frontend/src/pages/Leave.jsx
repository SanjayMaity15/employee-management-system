import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import API from "../api/api";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Leave = () => {
    const { user } = useContext(AuthContext);
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false)

	const [leaves, setLeaves] = useState([]);
	const [editingLeaveId, setEditingLeaveId] = useState(null);

	const [formData, setFormData] = useState({
		fromDate: "",
		toDate: "",
		reason: "",
	});

	/* ================= FETCH LEAVES ================= */
	const fetchLeaves = async () => {
		try {
			const url = user.role === "admin" ? "/leave/all" : "/leave/my";
			const res = await API.get(url);
			setLeaves(res.data);
		} catch (err) {
			toast.error("Failed to load leaves");
		}
	};

	useEffect(() => {
		fetchLeaves();
	}, []);

	/* ================= STATUS COLOR ================= */
	const getStatusColor = (status) => {
		switch (status) {
			case "approved":
				return "text-green-600";
			case "rejected":
				return "text-red-600";
			default:
				return "text-yellow-600";
		}
	};

	/* ================= FORM HANDLERS ================= */
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	/* ================= APPLY LEAVE ================= */
	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true)
		try {
			await API.post("/leave", {
				startDate: formData.fromDate,
				endDate: formData.toDate,
				reason: formData.reason,
			});

			toast.success("Leave applied successfully!");
			setFormData({ fromDate: "", toDate: "", reason: "" });
			setLoading(false)
			fetchLeaves();
		} catch (err) {
			toast.error(err.response?.data?.message || "Something went wrong");
			setLoading(false)
		}
	};

	/* ================= ADMIN UPDATE ================= */
	const updateLeaveStatus = async (id, status) => {
		try {
			await API.put(`/leave/${id}`, { status });
			toast.success(`Leave ${status}`);
			setEditingLeaveId(null);
			fetchLeaves();
		} catch (err) {
			toast.error("Action failed");
		}
	};

	return (
		<div>
			<Navbar />
			<div className="p-6 bg-gray-100 min-h-screen">
				<h2 className="text-2xl font-bold mb-6 text-center">
					Leave Management
				</h2>

				{/* ================= EMPLOYEE FORM ================= */}
				{user.role === "employee" && (
					<form
						onSubmit={handleSubmit}
						className="bg-white p-4 rounded shadow mb-6"
					>
						<div className="grid md:grid-cols-3 gap-4">
							<input
								type="date"
								name="fromDate"
								value={formData.fromDate}
								onChange={handleChange}
								required
								className="border p-2 focus:outline-green-500 rounded"
							/>
							<input
								type="date"
								name="toDate"
								value={formData.toDate}
								onChange={handleChange}
								required
								className="border focus:outline-green-500 p-2 rounded"
							/>
							<input
								type="text"
								name="reason"
								placeholder="Reason"
								value={formData.reason}
								onChange={handleChange}
								required
								className="border focus:outline-green-500 p-2 rounded"
							/>
						</div>

						<button
							type="submit"
							className="px-5 py-2 rounded-lg
                                bg-green-100 text-green-700 border border-green-600
                                hover:bg-green-200 transition font-medium w-full mt-6"
						>
							{loading ? "Applying..." : "Apply Leaveg"}
						</button>
					</form>
				)}

				{/* ================= LEAVE TABLE ================= */}
				<div className="bg-white p-4 rounded shadow overflow-x-auto">
					<table className="min-w-full">
						<thead>
							<tr className="bg-gray-200 text-center">
								<th className="p-2 text-purple-600">
									Employee
								</th>
								<th className="p-2 text-green-600">From</th>
								<th className="p-2 text-red-600">To</th>
								<th className="p-2 text-yellow-600">Reason</th>
								<th className="p-2 text-gray-600">Status</th>
								{user.role === "admin" && (
									<th className="p-2 text-pink-600">
										Action
									</th>
								)}
							</tr>
						</thead>
						<tbody>
							{leaves.map((leave) => (
								<tr
									key={leave._id}
									className="border-t text-center"
								>
									<td className="p-2 text-purple-500 font-semibold">
										{user.role === "admin"
											? leave.user?.name
											: "You"}
									</td>

									<td className="p-2 text-green-500">
										{new Date(
											leave.startDate
										).toLocaleDateString()}
									</td>

									<td className="p-2 text-red-500">
										{new Date(
											leave.endDate
										).toLocaleDateString()}
									</td>

									<td className="p-2 text-yellow-500">
										{leave.reason}
									</td>

									{/* ===== STATUS WITH COLOR ===== */}
									<td
										className={`p-2 text-gray-500 font-semibold capitalize ${getStatusColor(
											leave.status
										)}`}
									>
										{leave.status}
									</td>

									{/* ===== ADMIN ACTION ===== */}
									{user.role === "admin" && (
										<td className="p-2 text-pink-500">
											{leave.status === "pending" ||
											editingLeaveId === leave._id ? (
												<div className="flex justify-center gap-2">
													<button
														onClick={() =>
															updateLeaveStatus(
																leave._id,
																"approved"
															)
														}
														className="px-5 py-2 rounded-lg
                                                            bg-green-100 text-green-700 border border-green-600
                                                            hover:bg-green-200 transition font-medium"
													>
														Approve
													</button>

													<button
														onClick={() =>
															updateLeaveStatus(
																leave._id,
																"rejected"
															)
														}
														className="px-5 py-2 rounded-lg
                                                            bg-red-200 text-red-700 border border-red-600
                                                            hover:bg-red-200 transition font-medium"
													>
														Reject
													</button>
												</div>
											) : (
												<button
													onClick={() =>
														setEditingLeaveId(
															leave._id
														)
													}
													className="text-gray-600 hover:text-gray-800"
													title="Edit status"
												>
													<FaEdit size={18} />
												</button>
											)}
										</td>
									)}
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

export default Leave;
