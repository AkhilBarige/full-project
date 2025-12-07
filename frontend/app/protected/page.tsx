"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "../../lib/auth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/login");
        } else {
            setAuthorized(true);
        }
    }, []); // run once

    if (!authorized) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
                <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-transparent rounded-full"></div>
            </div>
        );
    }

    return <>{children}</>;
}