import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
	const { user, logout } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/login");
	};

	return (
		<nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center sticky top-0">
            <Link className="text-2xl tracking-wider font-bold"
            to={"/dashboard"}
            >StaffSync</Link>

			<button
				onClick={handleLogout}
				className="px-5 py-2 rounded-full
                                bg-red-200 text-red-700 border border-red-600
                                hover:bg-red-300 transition font-medium cursor-pointer"
			>
				Logout
			</button>
		</nav>
	);
};

export default Navbar;
