"use client";

import { FaGithub, FaLinkedin, FaArrowUp } from "react-icons/fa";

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="bg-gray-900 text-white text-center py-8 mt-10 relative">
            {/* Divider */}
            <div className="border-t border-gray-700 mb-6"></div>

            {/* Built With */}
            <p className="text-gray-300 mb-4">
                Built with ❤️ using Next.js, Express, MongoDB, and Tailwind CSS
            </p>

            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-8 text-lg mb-6">
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
                    className="flex items-center gap-2 hover:text-blue-400 transform hover:scale-110 transition duration-200"
                >
                    <FaGithub className="text-xl" /> GitHub
                </a>
                <a
                    href="https://www.linkedin.com/in/akhil-barige-59a168233/"
                    target="_blank"
                    className="flex items-center gap-2 hover:text-blue-400 transform hover:scale-110 transition duration-200"
                >
                    <FaLinkedin className="text-xl" /> LinkedIn
                </a>
            </div>

            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                className="absolute right-6 bottom-6 bg-blue-600 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg transition transform hover:scale-110"
                aria-label="Back to Top"
            >
                <FaArrowUp className="text-xl" />
            </button>

            {/* Copyright */}
            <p className="text-gray-500 text-sm mt-6">
                © {new Date().getFullYear()} MyApp. All rights reserved.
            </p>
        </footer>
    );
}