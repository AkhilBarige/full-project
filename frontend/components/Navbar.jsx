"use client";

import Link from "next/link";
import { clearToken, getToken } from "../lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = getToken();
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        clearToken();
        setIsLoggedIn(false);
        router.push("/login");
    };

    return (
        <nav className="bg-gray-400 text-black px-6 py-4 flex items-center justify-between shadow-md">
            {/* Left side: Logo */}
            <div className="text-2xl font-bold">
                <Link href="/" className="hover:scale-110 transform transition duration-200">
                    MyApp
                </Link>
            </div>

            {/* Middle: Nav links */}
            <div className="flex gap-10 text-xl font-bold">
                <Link href="/" className="hover:scale-110 transform transition duration-200">Home</Link>
                <Link href="/dashboard" className="hover:scale-110 transform transition duration-200">Dashboard</Link>
                <Link href="/tasks" className="hover:scale-110 transform transition duration-200">Tasks</Link>
                <Link href="/about" className="hover:scale-110 transform transition duration-200">About</Link>
                <Link href="/contact" className="hover:scale-110 transform transition duration-200">Contact</Link>
            </div>

            {/* Right side: Auth buttons */}
            <div className="flex gap-6 font-bold">
                {!isLoggedIn ? (
                    <>
                        <Link href="/login" className="hover:scale-110 transform transition duration-200">Login</Link>
                        <Link href="/signup" className="hover:scale-110 transform transition duration-200">Signup</Link>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="bg-gray-600 text-white text-xl px-4 py-2 rounded hover:bg-gray-800 transform hover:scale-105 transition duration-200"
                    >
                        Logout
                    </button>
                )}
            </div>
        </nav>
    );
}