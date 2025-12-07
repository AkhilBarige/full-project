"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../lib/api";
import Alert from "../../components/Alert";
import Button from "../../components/Button";

type UserProfile = {
    username: string;
    email: string;
    fullName?: string;
    dob?: string;
    phone?: string;
    address?: string;
    passwordUpdatedAt?: string;
};

export default function ProfilePageClient({ successFlag }: { successFlag?: string }) {
    const router = useRouter();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get("/auth/profile");
                setProfile(res.data.data);
            } catch (err: any) {
                setErrorMessage("Failed to load profile.");
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    useEffect(() => {
        if (successFlag === "password") {
            setSuccessMessage("Password updated successfully!");
        }
    }, [successFlag]);

    const handleEditField = (field: keyof UserProfile) => {
        router.push(`/profile/edit?field=${field}`);
    };

    const handleChangePassword = () => {
        router.push("/profile/change-password");
    };

    return (
        <div className="p-6 min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-center">My Profile</h1>

            {errorMessage && <Alert type="error" message={errorMessage} />}
            {successMessage && <Alert type="success" message={successMessage} />}

            {loading ? (
                <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-transparent rounded-full mx-auto my-4"></div>
            ) : profile ? (
                <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md space-y-4">
                    <div>
                        <p className="text-sm text-gray-400">Username</p>
                        <p className="text-lg font-semibold">{profile.username}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="text-lg font-semibold">{profile.email}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-400">Full Name</p>
                            <p className="text-lg font-semibold">{profile.fullName || "Not set"}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleEditField("fullName")}>
                            Edit
                        </Button>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-400">Date of Birth</p>
                            <p className="text-lg font-semibold">{profile.dob || "Not set"}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleEditField("dob")}>
                            Edit
                        </Button>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-400">Phone</p>
                            <p className="text-lg font-semibold">{profile.phone || "Not set"}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleEditField("phone")}>
                            Edit
                        </Button>
                    </div>
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-sm text-gray-400">Address</p>
                            <p className="text-lg font-semibold">{profile.address || "Not set"}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleEditField("address")}>
                            Edit
                        </Button>
                    </div>

                    {/* Password Updated Date */}
                    <div>
                        <p className="text-sm text-gray-400">Password Updated</p>
                        <p className="text-lg font-semibold">
                            {profile.passwordUpdatedAt
                                ? new Date(profile.passwordUpdatedAt).toLocaleString()
                                : "Never"}
                        </p>
                    </div>

                    {/* Change Password */}
                    <div className="mt-6 flex justify-center">
                        <Button variant="default" size="md" onClick={handleChangePassword}>
                            🔒 Change Password
                        </Button>
                    </div>
                </div>
            ) : (
                <p className="text-gray-400">No profile data found.</p>
            )}
        </div>
    );
}