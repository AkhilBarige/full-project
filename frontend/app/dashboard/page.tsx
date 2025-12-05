"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "../../lib/auth";
import { api } from "../../lib/api";
import Alert from "../../components/Alert"; // adjust path if needed

// Task type
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
        } catch (err) {
            console.error(err);
            setErrorMessage("Failed to load tasks.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const token = getToken();
        if (!token) {
            router.push("/login");
            return;
        }
        fetchTasks();
    }, [router]);

    const handleDelete = async (id: string) => {
        setLoading(true);
        setErrorMessage("");
        setSuccessMessage("");
        try {
            await api.delete(`/tasks/${id}`);
            setSuccessMessage("Task deleted successfully!");
            fetchTasks();
        } catch (err) {
            console.error(err);
            setErrorMessage("Failed to delete task.");
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
        } catch (err) {
            console.error(err);
            setErrorMessage("Failed to update task.");
            setLoading(false);
        }
    };

    return (
        <div className="p-6 bg-gray-700 min-h-screen text-white flex flex-col items-center">
            {/* Centered heading */}
            <h1 className="text-3xl font-bold mb-6 text-center">My Dashboard</h1>

            {/* Alerts */}
            {errorMessage && <Alert type="error" message={errorMessage} />}
            {successMessage && <Alert type="success" message={successMessage} />}

            {/* Loading Spinner */}
            {loading && (
                <div className="animate-spin h-6 w-6 border-2 border-white border-t-transparent rounded-full mx-auto my-4"></div>
            )}

            {tasks.length === 0 && !loading ? (
                <p className="text-gray-300 text-center">No tasks yet. Try creating one!</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
                    {tasks.map((task) => (
                        <div
                            key={task._id}
                            className="bg-gray-800 rounded-lg p-4 flex flex-col justify-between shadow-md"
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
                                <button
                                    onClick={() => handleToggle(task._id, task.completed)}
                                    disabled={loading}
                                    className={`flex-1 px-3 py-2 rounded transition ${loading
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : "bg-gray-200 text-black hover:bg-gray-500"
                                        }`}
                                >
                                    {task.completed ? "Mark Pending" : "Mark Done"}
                                </button>
                                <button
                                    onClick={() => handleDelete(task._id)}
                                    disabled={loading}
                                    className={`flex-1 px-3 py-2 rounded transition ${loading
                                            ? "bg-gray-500 cursor-not-allowed"
                                            : "bg-red-500 text-white hover:bg-red-700"
                                        }`}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}