import React, { useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Login = () => {
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const res = await API.post("/auth/login", { email, password });

			// Save token
			localStorage.setItem("token", res.data.token);
			login(res.data.user);

			toast.success("Login Successful!");
			navigate("/dashboard");
		} catch (err) {
			toast.error(err.response?.data?.message || "Login failed");
		}
	};

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<form
				className="bg-white p-8 rounded shadow-md w-96"
				onSubmit={handleSubmit}
			>
				<h2 className="text-2xl mb-6 text-center font-bold">Login</h2>
				<input
					type="email"
					placeholder="Email"
					className="w-full p-2 mb-4 border rounded"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<input
					type="password"
					placeholder="Password"
					className="w-full p-2 mb-4 border rounded"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<button
					className="px-5 py-2 rounded-lg w-full
                                bg-indigo-100 text-indigo-700 border border-indigo-600
                                hover:bg-indigo-200 transition font-medium"
				>
					Login
				</button>
			</form>
		</div>
	);
};

export default Login;
