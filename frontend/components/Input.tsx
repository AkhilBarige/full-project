"use client";

import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export default function Input({ label, error, className, ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-1">
            {label && <label className="text-sm text-gray-300">{label}</label>}
            <input
                {...props}
                className={`w-full px-3 py-2 rounded-md border border-gray-600 bg-gray-900 text-gray-100 
          focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-colors duration-200 ${className ?? ""}`}
            />
            {error && <span className="text-xs text-red-400">{error}</span>}
        </div>
    );
}