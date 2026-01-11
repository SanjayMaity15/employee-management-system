import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import API from "../api/api";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Profile = () => {
	const { user } = useContext(AuthContext);
	const [profile, setProfile] = useState(null);

	const fetchProfile = async () => {
		try {
			const res = await API.get(`/employees/${user._id}`);
			setProfile(res.data);
		} catch (err) {
			toast.error("Failed to load profile");
		}
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	if (!profile)
		return (
			<div>
				<Navbar />
				Loading...
			</div>
		);

	return (
		<div>
			<Navbar />
			<div className="p-6 bg-gray-100 min-h-screen">
				<h2 className="text-2xl font-bold mb-4">Profile</h2>
				<div className="bg-white shadow rounded p-6 w-96">
					<p>
						<strong>Name:</strong> {profile.name}
					</p>
					<p>
						<strong>Email:</strong> {profile.email}
					</p>
					<p>
						<strong>Designation:</strong> {profile.designation}
					</p>
					<p>
						<strong>Department:</strong> {profile.department}
					</p>
				</div>
			</div>
		</div>
	);
};

export default Profile;
