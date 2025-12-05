"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../lib/api";
import { saveToken } from "../../lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Alert from "../../components/Alert"; // adjust path if needed

// 1. Validation schema
const schema = z.object({
    username: z
        .string()
        .min(4, "Username must be at least 4 characters")
        .regex(/^[a-z0-9]+$/, "Username must be lowercase letters/numbers only"),
    fullName: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

// 2. Types
type SignupFormData = z.infer<typeof schema>;

type ApiResponse<T> = {
    statusCode: number;
    data: T;
    message: string;
};

type SignupResponseData = {
    user: {
        _id: string;
        email: string;
        username: string;
        fullName?: string;
    };
    accessToken: string;
};

export default function SignupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({ resolver: zodResolver(schema) });

    const onSubmit = async (data: SignupFormData) => {
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");
        try {
            const res = await api.post<ApiResponse<SignupResponseData>>(
                "/auth/signup",
                data
            );
            saveToken(res.data.data.accessToken);
            setSuccessMessage("Signup successful! Redirecting...");
            setTimeout(() => router.push("/dashboard"), 1000);
        } catch (err) {
            console.error("Signup error:", err);
            setErrorMessage("Signup failed. Please check your inputs and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-700 text-white">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-gray-800 p-6 rounded-lg shadow-md w-96 space-y-4"
            >
                <h1 className="text-2xl font-bold text-center">Create Account</h1>

                {/* Alerts */}
                {errorMessage && <Alert type="error" message={errorMessage} />}
                {successMessage && <Alert type="success" message={successMessage} />}

                <div>
                    <input
                        {...register("username")}
                        placeholder="Username (lowercase)"
                        className="w-full bg-gray-900 text-white border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.username && (
                        <p className="text-red-400 text-sm mt-1">{errors.username.message}</p>
                    )}
                </div>

                <div>
                    <input
                        {...register("fullName")}
                        placeholder="Full Name"
                        className="w-full bg-gray-900 text-white border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.fullName && (
                        <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>
                    )}
                </div>

                <div>
                    <input
                        {...register("email")}
                        placeholder="Email"
                        className="w-full bg-gray-900 text-white border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.email && (
                        <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <input
                        {...register("password")}
                        type="password"
                        placeholder="Password"
                        className="w-full bg-gray-900 text-white border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {errors.password && (
                        <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-2 rounded transition ${loading
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                        }`}
                >
                    {loading ? "Signing up..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
}