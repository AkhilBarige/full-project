"use client";

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-gray-700 text-white flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold mb-6 text-center">Contact</h1>

            {/* Intro description */}
            <p className="max-w-2xl text-center text-gray-300 mb-8">
                I’d love to hear from you! Whether it’s collaboration, feedback, or new opportunities,
                feel free to reach out through the platforms below.
            </p>

            {/* Contact options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl">
                {/* GitHub */}
                <a
                    href="https://github.com/AkhilBarige"
                    target="_blank"
                    className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-600 transform hover:scale-105 transition duration-200 flex flex-col items-center"
                >
                    <span className="text-4xl mb-2">🐙</span>
                    <h2 className="text-xl font-semibold mb-2">GitHub</h2>
                    <p className="text-gray-300 text-center">Explore my projects and code contributions.</p>
                </a>

                {/* LinkedIn */}
                <a
                    href="https://www.linkedin.com/in/akhil-barige-59a168233/"
                    target="_blank"
                    className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-600 transform hover:scale-105 transition duration-200 flex flex-col items-center"
                >
                    <span className="text-4xl mb-2">💼</span>
                    <h2 className="text-xl font-semibold mb-2">LinkedIn</h2>
                    <p className="text-gray-300 text-center">Connect with me professionally and view my career journey.</p>
                </a>

                {/* Email */}
                <div className="bg-gray-800 p-6 rounded-lg shadow hover:bg-gray-600 transform hover:scale-105 transition duration-200 flex flex-col items-center">
                    <span className="text-4xl mb-2">📧</span>
                    <h2 className="text-xl font-semibold mb-2">Email</h2>
                    <p className="text-gray-300 text-center">akhilbarige21@gmail.com</p>
                </div>
            </div>
        </div>
    );
}