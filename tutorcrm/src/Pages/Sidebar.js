import { useState } from "react";
import { VscSignOut, VscSettingsGear, VscDashboard, VscBook, VscAccount } from "react-icons/vsc";
import { NavLink, useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();
    // State to switch between "Tutor" and "Parent" roles
    const [role, setRole] = useState("Tutor"); // Default role is "Tutor"
    const handleLogOut = (e) => {
        e.preventDefault();
        localStorage.clear();
        navigate('/login')
    }
    return (
        <div className="fixed top-0 left-0  flex h-[calc(100vh-3.5rem)] bg-[#e8f9f3] min-w-[220px] max-w-[250px] flex-col border-r-[1px] border-r-gray-700 bg-gray-800 py-10">
            {/* Role Selection */}
            <div className="flex justify-center mb-4">
                <button
                    onClick={() => setRole("Tutor")}
                    className={`px-4 py-2 ${role === "Tutor" ? "bg-blue-600 text-white" : "bg-gray-600 text-white"}`}
                >
                    Tutor
                </button>
                <button
                    onClick={() => setRole("Parent")}
                    className={`ml-2 px-4 py-2 ${role === "Parent" ? "bg-blue-600 text-white" : "bg-gray-600 text-white"}`}
                >
                    Parent
                </button>

            </div>

            {/* Static Sidebar Links */}
            <div className="flex flex-col">
                {role === "Tutor" ? (
                    <>
                        <NavLink
                            to="/dashboard/homme"
                            className={({ isActive }) => `relative px-8 py-2 text-sm font-medium transition-all duration-200 ${isActive ? "bg-blue-500 text-white" : "text-richblack-300"}`}
                            onClick={() => console.log("Resetting course state...")}
                        >
                            <div className="flex items-center gap-x-2">
                                <VscDashboard className="text-lg" />
                                <span>Dashboard</span>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/dashboard/profile-approval"
                            className={({ isActive }) => `relative px-8 py-2 text-sm font-medium transition-all duration-200 ${isActive ? "bg-blue-500 text-white" : "text-richblack-300"}`}
                            onClick={() => console.log("Resetting course state...")}
                        >
                            <div className="flex items-center gap-x-2">
                                <VscBook className="text-lg" />
                                <span>Profile & Approval
                                </span>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/dashboard/payout"
                            className={({ isActive }) => `relative px-8 py-2 text-sm font-medium transition-all duration-200 ${isActive ? "bg-blue-500 text-white" : "text-richblack-300"}`}
                            onClick={() => console.log("Resetting course state...")}
                        >
                            <div className="flex items-center gap-x-2">
                                <VscBook className="text-lg" />
                                <span>Payout</span>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/dashboard/notifications"
                            className={({ isActive }) => `relative px-8 py-2 text-sm font-medium transition-all duration-200 ${isActive ? "bg-blue-500 text-white" : "text-richblack-300"}`}
                            onClick={() => console.log("Resetting course state...")}
                        >
                            <div className="flex items-center gap-x-2">
                                <VscBook className="text-lg" />
                                <span>Notifications</span>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/dashboard/reports"
                            className={({ isActive }) => `relative px-8 py-2 text-sm font-medium transition-all duration-200 ${isActive ? "bg-blue-500 text-white" : "text-richblack-300"}`}
                            onClick={() => console.log("Resetting course state...")}
                        >
                            <div className="flex items-center gap-x-2">
                                <VscBook className="text-lg" />
                                <span>Reports</span>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/dashboard/login-as"
                            className={({ isActive }) => `relative px-8 py-2 text-sm font-medium transition-all duration-200 ${isActive ? "bg-blue-500 text-white" : "text-richblack-300"}`}
                            onClick={() => console.log("Resetting course state...")}
                        >
                            <div className="flex items-center gap-x-2">
                                <VscBook className="text-lg" />
                                <span>Login-as</span>
                            </div>
                        </NavLink>
                    </>
                ) : (
                    <>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) => `relative px-8 py-2 text-sm font-medium transition-all duration-200 ${isActive ? "bg-blue-500 text-white" : "text-richblack-300"}`}
                            onClick={() => console.log("Resetting course state...")}
                        >
                            <div className="flex items-center gap-x-2">
                                <VscDashboard className="text-lg" />
                                <span>Dashboard</span>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/dashboard/parent/profile"
                            className={({ isActive }) => `relative px-8 py-2 text-sm font-medium transition-all duration-200 ${isActive ? "bg-blue-500 text-white" : "text-richblack-300"}`}
                            onClick={() => console.log("Resetting course state...")}
                        >
                            <div className="flex items-center gap-x-2">
                                <VscAccount className="text-lg" />
                                <span>Profile</span>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/dashboard/parent/invoicing"
                            className={({ isActive }) => `relative px-8 py-2 text-sm font-medium transition-all duration-200 ${isActive ? "bg-blue-500 text-white" : "text-richblack-300"}`}
                            onClick={() => console.log("Resetting course state...")}
                        >
                            <div className="flex items-center gap-x-2">
                                <VscAccount className="text-lg" />
                                <span>Invoicing</span>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/dashboard/parent/notifications"
                            className={({ isActive }) => `relative px-8 py-2 text-sm font-medium transition-all duration-200 ${isActive ? "bg-blue-500 text-white" : "text-richblack-300"}`}
                            onClick={() => console.log("Resetting course state...")}
                        >
                            <div className="flex items-center gap-x-2">
                                <VscAccount className="text-lg" />
                                <span>Notifications</span>
                            </div>
                        </NavLink>
                        <NavLink
                            to="/dashboard/parent/reports"
                            className={({ isActive }) => `relative px-8 py-2 text-sm font-medium transition-all duration-200 ${isActive ? "bg-blue-500 text-white" : "text-richblack-300"}`}
                            onClick={() => console.log("Resetting course state...")}
                        >
                            <div className="flex items-center gap-x-2">
                                <VscAccount className="text-lg" />
                                <span>Reports</span>
                            </div>
                        </NavLink>
                    </>
                )}
            </div>

            {/* Divider */}
            <div className="mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-gray-700" />

            {/* Settings and Logout */}
            <div className="flex flex-col">
                <NavLink
                    to="/dashboard/settings"
                    className={({ isActive }) => `relative px-8 py-2 text-sm font-medium transition-all duration-200 ${isActive ? "bg-blue-500 text-white" : "text-richblack-300"}`}
                >
                    <div className="flex items-center gap-x-2">
                        <VscSettingsGear className="text-lg" />
                        <span>Settings</span>
                    </div>
                </NavLink>
                <button
                    onClick={(e) => handleLogOut(e)}
                    className="px-8 py-2 text-sm font-medium text-richblack-300"
                >
                    <div className="flex items-center gap-x-2">
                        <VscSignOut className="text-lg" />
                        <span>Logout</span>
                    </div>
                </button>
            </div>
        </div>
    );
}
