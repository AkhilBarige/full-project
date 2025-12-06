"use client";

import Link from "next/link";
import { clearToken, getToken } from "../lib/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/Button"; // ✅ reusable Button

export default function Navbar() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const token = getToken();
        setIsLoggedIn(!!token);

        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogout = () => {
        clearToken();
        setIsLoggedIn(false);
        router.push("/login");
    };

    return (
        <nav
            className={`fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md transition-shadow duration-300 ${scrolled ? "shadow-md bg-gray-900/80" : "bg-gray-900/60"
                }`}
        >
            {/* Left side: Logo */}
            <div className="text-xl font-semibold tracking-tight text-white">
                <Link href="/" className="hover:opacity-80 transition-opacity duration-200">
                    MyApp
                </Link>
            </div>

            {/* Middle: Nav links */}
            <div className="flex gap-8 text-sm font-medium text-gray-200">
                {["Home", "Dashboard", "Tasks", "Profile", "About", "Contact"].map((item) => (
                    <Link
                        key={item}
                        href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                        className="relative group"
                    >
                        <span className="transition-colors duration-200 group-hover:text-white">
                            {item}
                        </span>
                        <span className="absolute left-0 -bottom-1 w-full h-[1px] bg-white scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                    </Link>
                ))}
            </div>

            {/* Right side: Auth buttons */}
            <div className="flex gap-4">
                {!isLoggedIn ? (
                    <>
                        <Link href="/login">
                            <Button variant="outline" size="sm">Login</Button>
                        </Link>
                        <Link href="/signup">
                            <Button variant="default" size="sm">Signup</Button>
                        </Link>
                    </>
                ) : (
                    <Button
                        onClick={handleLogout}
                        variant="default"
                        size="sm"
                    >
                        Logout
                    </Button>
                )}
            </div>
        </nav>
    );
}