"use client";

import ChangePasswordForm from "../../components/ChangePasswordForm";
import { getToken } from "../../lib/auth";

export default function ChangePasswordPage() {
    // ✅ Use your existing helper to get token
    const token = getToken();

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-8">
            <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md section-fade">
                <h1 className="text-2xl font-bold mb-4 text-center">🔒 Change Password</h1>
                <p className="text-gray-400 text-center mb-6">
                    Enter your current and new password below to update your account securely.
                </p>
                <ChangePasswordForm token={token} />
            </div>
        </div>
    );
}