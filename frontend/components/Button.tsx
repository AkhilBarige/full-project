"use client";

import { cn } from "../lib/utils"; // helper to merge classNames if you have one

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "destructive";
    size?: "sm" | "md" | "lg";
}

export default function Button({
    children,
    variant = "default",
    size = "md",
    className,
    ...props
}: ButtonProps) {
    const base =
        "inline-flex items-center justify-center rounded-md font-medium transition-colors duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        default: "bg-gray-800 text-white hover:bg-gray-700",
        outline: "border border-gray-600 text-gray-200 hover:bg-gray-800",
        ghost: "text-gray-300 hover:bg-gray-800/40",
        destructive: "bg-red-600 text-white hover:bg-red-700",
    };

    const sizes = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
        lg: "px-5 py-3 text-lg",
    };

    return (
        <button
            className={cn(base, variants[variant], sizes[size], className)}
            {...props}
        >
            {children}
        </button>
    );
}