"use client";
import { useState } from "react";
import { changePassword } from "../lib/auth";

interface ChangePasswordFormProps {
    token?: string | null; // make token optional if you rely on interceptor
}

export default function ChangePasswordForm({ token }: ChangePasswordFormProps) {
    const [oldPassword, setOldPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            // If your changePassword in auth.ts doesn't accept token, remove it here
            const res = await changePassword(oldPassword, newPassword);
            setMessage(res.message || "Password changed successfully");
        } catch (err: any) {
            setMessage(err.message || "Failed to change password");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                className="border p-2 w-full"
            />
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border p-2 w-full"
            />
            <button type="submit" className="bg-blue-600 text-white px-4 py-2">
                Change Password
            </button>
            {message && <p>{message}</p>}
        </form>
    );
}