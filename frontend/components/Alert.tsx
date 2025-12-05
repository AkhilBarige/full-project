"use client";

type AlertProps = {
    type: "success" | "error" | "info";
    message: string;
};

export default function Alert({ type, message }: AlertProps) {
    const baseClasses =
        "p-3 rounded mb-4 text-sm font-medium transition duration-200";

    const typeClasses = {
        success: "bg-green-600 text-white",
        error: "bg-red-600 text-white",
        info: "bg-blue-600 text-white",
    };

    return (
        <div className={`${baseClasses} ${typeClasses[type]}`}>
            {message}
        </div>
    );
}