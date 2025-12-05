"use client";

import { useForm } from "react-hook-form";
import { api } from "../../lib/api";
import { useRouter } from "next/navigation";
import { getToken } from "../../lib/auth";
import { useState } from "react";
import Alert from "../../components/Alert"; // adjust path if needed

type TaskFormData = {
    title: string;
    description?: string;
};

export default function TasksPage() {
    const router = useRouter();
    const { register, handleSubmit, reset } = useForm<TaskFormData>();

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const onSubmit = async (data: TaskFormData) => {
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");
        try {
            const token = getToken();

            if (!token) {
                console.warn("No token found, redirecting to login...");
                router.push("/login");
                return;
            }

            console.log("Token being sent:", token);

            await api.post("/tasks", data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setSuccessMessage("✅ Task created successfully!");
            reset();
        } catch (err: any) {
            console.error("Task creation error:", err);
            const message =
                err.response?.data?.message || "❌ Failed to create task.";
            setErrorMessage(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 min-h-screen bg-gray-700 text-white flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-6 text-center">Create a New Task</h1>

            {/* Alerts */}
            {errorMessage && <Alert type="error" message={errorMessage} />}
            {successMessage && <Alert type="success" message={successMessage} />}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 w-full max-w-md bg-gray-800 p-6 rounded-lg shadow"
            >
                <input
                    {...register("title", { required: true })}
                    placeholder="Task title"
                    className="w-full bg-gray-900 text-white border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <textarea
                    {...register("description")}
                    placeholder="Task description"
                    className="w-full bg-gray-900 text-white border border-gray-600 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
                <button
                    type="submit"
                    disabled={loading}
                    className={`w-full p-2 rounded transition ${loading
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                        }`}
                >
                    {loading ? "Adding..." : "Add Task"}
                </button>
            </form>
        </div>
    );
}