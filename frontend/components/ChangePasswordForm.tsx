"use client";

import { useState } from "react";
import { changePassword } from "../lib/auth";
import Button from "./Button";
import Input from "./Input";
import Alert from "./Alert";

interface ChangePasswordFormProps {
    onSuccess?: () => void;
}

export default function ChangePasswordForm({ onSuccess }: ChangePasswordFormProps) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (newPassword !== confirmPassword) {
            setError("New password and confirmation do not match.");
            return;
        }

        try {
            setLoading(true);
            await changePassword(oldPassword, newPassword);
            if (onSuccess) onSuccess(); // redirect handled in parent
        } catch (err: any) {
            setError(err.response?.data?.message || "Failed to change password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {error && <Alert type="error" message={error} />}

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