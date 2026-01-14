import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import API from "../api/api";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const EmployeeList = () => {
	const { user } = useContext(AuthContext);
	const [loading, setLoading] = useState(false)
	const [employees, setEmployees] = useState([]);
	const [form, setForm] = useState({
		name: "",
        email: "",
        password: "",
		designation: "",
		department: "",
	});
    const [editingId, setEditingId] = useState(null);
        const navigate = useNavigate();

	// Fetch all employees (Admin) or own data (Employee)
	const fetchEmployees = async () => {
		try {
            const res = await API.get('/employees');
            console.log(res);
            
            setEmployees(res.data)
            
		} catch (err) {
			toast.error("Failed to fetch employees");
		}
	};

	useEffect(() => {
		fetchEmployees();
	}, []);

	const handleChange = (e) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true)
		try {
			if (editingId) {
				await API.put(`/employees/${editingId}`, form);
				toast.success("Employee updated!");
				setEditingId(null);
				
			} else {
				await API.post("/employees", form);
				toast.success("Employee added!");
				
			}
			setForm({ name: "", email: "", designation: "", department: "" });
			fetchEmployees();
			setLoading(false);
		} catch (err) {
			toast.error("Operation failed");
			setLoading(false);
		}
	};

	const handleEdit = (emp) => {
		setForm({
			name: emp.name,
            email: emp.email,
            password : "",
			designation: emp.designation,
			department: emp.department,
		});
		setEditingId(emp._id);
	};

	const handleDelete = async (id) => {
		if (!window.confirm("Are you sure you want to delete this employee?"))
			return;
		try {
			await API.delete(`/employees/${id}`);
			toast.success("Employee deleted!");
			fetchEmployees();
		} catch (err) {
			toast.error("Delete failed");
		}
	};

	return (
		<div>
			<Navbar />
			<div className="p-6 bg-gray-100 min-h-screen">
				<h2 className="text-2xl font-bold mb-4 text-center">
					Employees
				</h2>

				{user.role === "admin" && (
					<form
						onSubmit={handleSubmit}
						className="bg-white p-4 rounded shadow mb-6"
					>
						<div className=" grid grid-cols-5 gap-4 mb-6">
							<input
								type="text"
								name="name"
								placeholder="Name"
								value={form.name}
								onChange={handleChange}
								className="border p-2 focus:outline-green-500 rounded"
								required
							/>
							<input
								type="email"
								name="email"
								placeholder="Email"
								value={form.email}
								onChange={handleChange}
								className="border p-2 focus:outline-green-500 rounded"
								required
							/>
							<input
								type="password"
								name="password"
								placeholder="Password"
								value={form.password}
								onChange={handleChange}
								className="border p-2 focus:outline-green-500 rounded"
								required
							/>
							<input
								type="text"
								name="designation"
								placeholder="Designation"
								value={form.designation}
								onChange={handleChange}
								className="border p-2 focus:outline-green-500 rounded"
							/>
							<input
								type="text"
								name="department"
								placeholder="Department"
								value={form.department}
								onChange={handleChange}
								className="border p-2 focus:outline-green-500 rounded"
							/>
						</div>
						<button
							type="submit"
							className="px-5 py-2 rounded-lg
                                bg-green-100 text-green-700 border border-green-600
                                hover:bg-green-200 transition font-medium w-full"
						>
							{
								loading ? "Please wait..." : (editingId ? "Update Employee" : "Add Employee")
							}
						</button>
					</form>
				)}

				<div className="bg-white shadow rounded p-4 overflow-x-auto">
					<table className="min-w-full table-auto">
						<thead>
							<tr className="bg-gray-200">
								<th className="px-4 py-2 text-purple-600">
									Name
								</th>
								<th className="px-4 py-2 text-orange-600">
									Email
								</th>
								<th className="px-4 py-2 text-green-600">
									Designation
								</th>
								<th className="px-4 py-2 text-gray-600">
									Department
								</th>
								{user.role === "admin" && (
									<th className="px-4 py-2 text-yellow-600">
										Actions
									</th>
								)}
							</tr>
						</thead>
						<tbody>
							{employees.map((emp) => (
								<tr
									key={emp._id}
									className="text-center border-t"
								>
									<td className="px-4 py-2 font-semibold text-purple-500">
										{emp.name}
									</td>
									<td className="px-4 py-2 text-orange-500">
										{emp.email}
									</td>
									<td className="px-4 py-2 text-green-500">
										{emp.designation}
									</td>
									<td className="px-4 py-2 text-gray-500">
										{emp.department}
									</td>
									{user.role === "admin" && (
										<td className="px-4 py-2 flex justify-center gap-2 ">
											<button
												onClick={() => handleEdit(emp)}
												className="px-5 py-2 rounded-full
                                bg-yellow-100 text-yellow-700 border border-yellow-600
                                hover:bg-yellow-200 transition font-medium"
											>
												Edit
											</button>
											<button
												onClick={() =>
													handleDelete(emp._id)
												}
												className="px-5 py-2 
                                bg-red-200 text-red-700 border border-red-600
                                hover:bg-red-300 rounded-full transition font-medium"
											>
												Delete
											</button>
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

export default EmployeeList;
