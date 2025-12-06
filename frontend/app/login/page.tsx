"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../lib/api";
import { saveToken } from "../../lib/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import Input from "../../components/Input";

// Validation schema
const schema = z.object({
    email: z.string().email("Enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof schema>;

type ApiResponse<T> = {
    statusCode: number;
    data: T;
    message: string;
};

type LoginResponseData = {
    user: {
        _id: string;
        email: string;
        username: string;
        fullName?: string;
    };
    accessToken: string;
};

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({ resolver: zodResolver(schema) });

    const onSubmit = async (data: LoginFormData) => {
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");
        try {
            const res = await api.post<ApiResponse<LoginResponseData>>("/auth/login", data);
            saveToken(res.data.data.accessToken);
            setSuccessMessage("Login successful! Redirecting...");
            setTimeout(() => router.push("/dashboard"), 1000);
        } catch (err) {
            console.error("Login error:", err);
            setErrorMessage("Login failed. Please check your credentials.");
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
                <h1 className="text-2xl font-semibold text-center">Login</h1>

                {/* Alerts */}
                {errorMessage && <Alert type="error" message={errorMessage} />}
                {successMessage && <Alert type="success" message={successMessage} />}

                {/* Inputs */}
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
                    {loading ? "Logging in..." : "Login"}
                </Button>

                {/* Signup link */}
                <div className="text-center mt-4 text-sm text-gray-400">
                    New here?{" "}
                    <a href="/signup" className="text-blue-400 hover:underline">
                        Sign up first
                    </a>
                </div>
            </form>
        </div>
    );
}