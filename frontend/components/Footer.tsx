"use client";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white text-center py-6 mt-10">
            <p className="text-gray-300">
                Built with ❤️ using Next.js, Express, MongoDB, and Tailwind CSS
            </p>

            {/* Quick Links */}
            <div className="mt-4 flex justify-center gap-10 text-lg">
                <a
                    href="/about"
                    className="hover:text-blue-400 transform hover:scale-110 transition duration-200"
                >
                    About
                </a>
                <a
                    href="/contact"
                    className="hover:text-blue-400 transform hover:scale-110 transition duration-200"
                >
                    Contact
                </a>
                <a
                    href="https://github.com/AkhilBarige"
                    target="_blank"
                    className="hover:text-blue-400 transform hover:scale-110 transition duration-200"
                >
                    GitHub
                </a>
                <a
                    href="https://www.linkedin.com/in/akhil-barige-59a168233/"
                    target="_blank"
                    className="hover:text-blue-400 transform hover:scale-110 transition duration-200"
                >
                    LinkedIn
                </a>
            </div>

            {/* Copyright */}
            <p className="text-gray-500 text-sm mt-4">
                © {new Date().getFullYear()} MyApp. All rights reserved.
            </p>
        </footer>
    );
}