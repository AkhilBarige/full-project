"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../lib/api";
import { saveToken } from "../../lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Alert from "../../components/Alert";
import Button from "../../components/Button";   // ✅ use reusable Button
import Input from "../../components/Input";     // ✅ create reusable Input

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
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-gray-100">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-gray-800 p-6 rounded-lg shadow-md w-96 space-y-4 section-fade"
            >
                <h1 className="text-2xl font-semibold text-center">Create Account</h1>

                {/* Alerts */}
                {errorMessage && <Alert type="error" message={errorMessage} />}
                {successMessage && <Alert type="success" message={successMessage} />}

                {/* Inputs */}
                <Input
                    {...register("username")}
                    placeholder="Username (lowercase)"
                    error={errors.username?.message}
                />
                <Input
                    {...register("fullName")}
                    placeholder="Full Name"
                    error={errors.fullName?.message}
                />
                <Input
                    {...register("email")}
                    placeholder="Email"
                    error={errors.email?.message}
                />
                <Input
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                    error={errors.password?.message}
                />

                {/* Button */}
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                    variant={loading ? "outline" : "default"}
                >
                    {loading ? "Signing up..." : "Sign Up"}
                </Button>
            </form>
        </div>
    );
}