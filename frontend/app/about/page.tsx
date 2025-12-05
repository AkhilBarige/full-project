"use client";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-gray-700 text-white flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold mb-6 text-center">About MyApp</h1>

            <p className="max-w-3xl text-center text-gray-300 mb-8">
                MyApp is a modern task manager designed to simplify productivity.
                Built with <span className="text-blue-400 font-semibold">Next.js</span>,
                <span className="text-green-400 font-semibold">Express</span>,
                <span className="text-yellow-400 font-semibold">MongoDB</span>, and
                <span className="text-pink-400 font-semibold">Tailwind CSS</span>,
                it demonstrates full‑stack development skills, secure authentication, and recruiter‑friendly design.
            </p>

            {/* Highlights Section */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-md max-w-2xl mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-center">✨ Highlights</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-300">
                    <li>
                        <span className="text-blue-400 font-semibold">Secure Authentication</span> with JWT and OTP fallback.
                    </li>
                    <li>
                        <span className="text-green-400 font-semibold">Responsive UI</span> built using Next.js and Tailwind CSS.
                    </li>
                    <li>
                        <span className="text-yellow-400 font-semibold">Scalable Backend</span> powered by Express and MongoDB.
                    </li>
                    <li>
                        <span className="text-pink-400 font-semibold">User‑Friendly Design</span> with clean navigation and polished layouts.
                    </li>
                </ul>
            </div>

            {/* Mission Section */}
            <div className="max-w-2xl text-center text-gray-300">
                <h2 className="text-2xl font-semibold mb-4">🚀 Mission</h2>
                <p>
                    Our mission is to provide a simple yet powerful platform for managing tasks,
                    showcasing <span className="text-blue-400 font-semibold">real‑world full‑stack skills</span>
                    and delivering a product that recruiters and users alike will appreciate.
                </p>
            </div>
        </div>
    );
}