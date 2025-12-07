"use client";

import ProtectedRoute from "../protected/page";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../../lib/api";
import Alert from "../../components/Alert";
import Button from "../../components/Button";

type Task = {
    _id: string;
    title: string;
    description?: string;
    completed: boolean;
};

export default function DashboardPage() {
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const fetchTasks = async () => {
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");
        try {
            const res = await api.get("/tasks");
            setTasks(res.data.data || []);
        } catch (err: any) {
            console.error(err);
            setErrorMessage(err.response?.data?.message || "Failed to load tasks.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks(); // no need for token check here, ProtectedRoute handles it
    }, []);

    const handleDelete = async (id: string) => {
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");
        try {
            await api.delete(`/tasks/${id}`);
            setSuccessMessage("Task deleted successfully!");
            fetchTasks();
        } catch (err: any) {
            console.error(err);
            setErrorMessage(err.response?.data?.message || "Failed to delete task.");
            setLoading(false);
        }
    };

    const handleToggle = async (id: string, completed: boolean) => {
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");
        try {
            await api.put(`/tasks/${id}`, { completed: !completed });
            setSuccessMessage("Task updated successfully!");
            fetchTasks();
        } catch (err: any) {
            console.error(err);
            setErrorMessage(err.response?.data?.message || "Failed to update task.");
            setLoading(false);
        }
    };

    return (
        <ProtectedRoute>
            <div className="p-6 bg-gray-900 min-h-screen text-gray-100 flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6 text-center">My Dashboard</h1>

                {errorMessage && <Alert type="error" message={errorMessage} />}
                {successMessage && <Alert type="success" message={successMessage} />}

                {loading && (
                    <div className="animate-spin h-6 w-6 border-2 border-gray-300 border-t-transparent rounded-full mx-auto my-4"></div>
                )}

                {tasks.length === 0 && !loading ? (
                    <p className="text-gray-400 text-center">No tasks yet. Try creating one!</p>
                ) : (
                    <div className="w-full max-w-md space-y-4">
                        {tasks.map((task) => (
                            <div
                                key={task._id}
                                className="card-hover bg-gray-800 rounded-lg p-4 shadow-md transition-transform duration-300 ease-in-out"
                            >
                                <div>
                                    <h2 className="text-lg font-semibold">{task.title}</h2>
                                    {task.description && (
                                        <p className="text-gray-400 mt-1">{task.description}</p>
                                    )}
                                    <span
                                        className={`inline-block mt-2 text-sm font-medium px-2 py-1 rounded ${task.completed
                                                ? "bg-green-600 text-white"
                                                : "bg-yellow-600 text-white"
                                            }`}
                                    >
                                        {task.completed ? "✅ Completed" : "❌ Pending"}
                                    </span>
                                </div>

                                <div className="flex gap-2 mt-4">
                                    <Button
                                        onClick={() => handleToggle(task._id, task.completed)}
                                        disabled={loading}
                                        variant="outline"
                                        size="sm"
                                        className="flex-1"
                                    >
                                        {task.completed ? "Mark Pending" : "Mark Done"}
                                    </Button>
                                    <Button
                                        onClick={() => handleDelete(task._id)}
                                        disabled={loading}
                                        variant="destructive"
                                        size="sm"
                                        className="flex-1"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-8 flex justify-center">
                    <Button
                        onClick={() => router.push("/tasks")}
                        variant="default"
                        size="md"
                    >
                        ➕ Create New Task
                    </Button>
                </div>
            </div>
        </ProtectedRoute>
    );
}