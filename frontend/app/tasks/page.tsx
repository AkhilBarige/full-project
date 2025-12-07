"use client";

import { useForm } from "react-hook-form";
import { api } from "../../lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Alert from "../../components/Alert";
import Input from "../../components/Input";
import Button from "../../components/Button";

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
            // ✅ No need to manually attach token — interceptor handles it
            await api.post("/tasks", data);

            setSuccessMessage("✅ Task created successfully!");
            reset();

            // Redirect back to dashboard immediately
            router.push("/dashboard");
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
        <div className="p-6 min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center">
            <h1 className="text-2xl font-semibold mb-6 text-center">
                Create a New Task
            </h1>

            {errorMessage && <Alert type="error" message={errorMessage} />}
            {successMessage && <Alert type="success" message={successMessage} />}

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4 w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md section-fade"
            >
                <Input
                    {...register("title", { required: true })}
                    placeholder="Task title"
                />
                <textarea
                    {...register("description")}
                    placeholder="Task description"
                    className="w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 
          focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors duration-200"
                />
                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                    variant={loading ? "outline" : "default"}
                >
                    {loading ? "Adding..." : "Add Task"}
                </Button>
            </form>
        </div>
    );
}