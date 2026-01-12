import React from "react";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaArrowLeft, FaHome } from "react-icons/fa";

const ErrorPage = ({
	title = "Page Not Found",
	message = "Sorry, the page you are looking for does not exist.",
}) => {
	const navigate = useNavigate();

	return (
		<div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 px-4">
			<div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
				{/* Icon */}
				<div className="flex justify-center mb-4">
					<FaExclamationTriangle className="text-red-500 text-6xl" />
				</div>

				{/* Title */}
				<h1 className="text-2xl font-bold text-gray-800 mb-2">
					{title}
				</h1>

				{/* Message */}
				<p className="text-gray-600 mb-6">{message}</p>

				{/* Buttons */}
				<div className="flex justify-center gap-4">
					<button
						onClick={() => navigate(-1)}
						className="flex items-center gap-2 px-5 py-2 rounded-lg
                                bg-red-200 text-red-700 border border-red-600
                                hover:bg-red-300 transition font-medium cursor-pointer"
					>
						<FaArrowLeft />
						Go Back
					</button>

					<button
						onClick={() => navigate("/dashboard")}
						className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
					>
						<FaHome />
						Dashboard
					</button>
				</div>
			</div>
		</div>
	);
};

export default ErrorPage;
