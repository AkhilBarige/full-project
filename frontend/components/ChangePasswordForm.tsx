"use client";

import { useState } from "react";
import { changePassword } from "../lib/auth";
import Button from "./Button";   // ✅ use reusable Button
import Input from "./Input";     // ✅ use reusable Input
import Alert from "./Alert";     // ✅ for success/error messages

interface ChangePasswordFormProps {
    token?: string | null; // optional if interceptor handles auth
}

export default function ChangePasswordForm({ token }: ChangePasswordFormProps) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (newPassword !== confirmPassword) {
            setError("New password and confirmation do not match.");
            return;
        }

        try {
            setLoading(true);
            const res = await changePassword(oldPassword, newPassword);
            setMessage(res.message || "Password changed successfully!");
        } catch (err: any) {
            setError(err.message || "Failed to change password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <Alert type="error" message={error} />}
            {message && <Alert type="success" message={message} />}

            <Input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
            />

            <Input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />

            <Input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
                type="submit"
                disabled={loading}
                className="w-full"
                variant={loading ? "outline" : "default"}
            >
                {loading ? "Changing..." : "Change Password"}
            </Button>
        </form>
    );
}