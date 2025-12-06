"use client";

import { motion } from "framer-motion"; // ✅ for animations

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white">
      {/* Hero Section */}
      <section className="text-center py-24">
        <motion.h1
          className="text-5xl font-extrabold mb-6"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Organize Your Tasks, Simplify Your Life
        </motion.h1>

        <motion.p
          className="text-lg mb-8 max-w-2xl mx-auto text-gray-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          A clean, secure, and collaborative task manager built with{" "}
          <span className="text-blue-400 font-semibold">Next.js</span>,{" "}
          <span className="text-green-400 font-semibold">Express</span>,{" "}
          <span className="text-yellow-400 font-semibold">MongoDB</span>, and{" "}
          <span className="text-pink-400 font-semibold">Tailwind CSS</span>.
        </motion.p>

        <motion.div
          className="space-x-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <a
            href="/dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-500 transition transform hover:scale-105"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="bg-transparent border border-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-gray-900 transition transform hover:scale-105"
          >
            Login
          </a>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 grid md:grid-cols-3 gap-8 text-center bg-gray-800">
        {[
          {
            title: "🔒 Secure Authentication",
            desc: "JWT + OTP fallback ensures your data stays safe and private.",
          },
          {
            title: "⚡ Fast & Responsive",
            desc: "Optimized with Next.js and Tailwind CSS for smooth performance.",
          },
          {
            title: "📊 Smart Dashboard",
            desc: "Track, update, and manage tasks effortlessly with a modern UI.",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            className="p-6 rounded-lg bg-gray-700 hover:bg-gray-600 transition transform hover:scale-105 shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.3, duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Demo Preview Section */}
      <section className="py-20 px-6 bg-gray-900 text-center">
        <motion.h2
          className="text-2xl font-bold mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Preview Your Dashboard
        </motion.h2>
        <motion.div
          className="max-w-md mx-auto bg-gray-800 rounded-lg p-6 shadow-lg hover:scale-105 transition"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-lg font-semibold">Sample Task</h3>
          <p className="text-gray-300 mt-2">This is how your tasks will look.</p>
          <span className="inline-block mt-3 text-sm font-medium px-2 py-1 rounded bg-yellow-600 text-white">
            ❌ Pending
          </span>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-white text-center py-12">
        <motion.h2
          className="text-2xl font-bold mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          ✨ Why Choose MyApp?
        </motion.h2>
        <motion.ul
          className="list-disc list-inside max-w-xl mx-auto text-gray-300 space-y-2 text-left"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          <li>🚀 Boost productivity with a clean, clutter‑free interface.</li>
          <li>🔒 Stay secure with JWT + OTP authentication.</li>
          <li>⚡ Experience lightning‑fast performance powered by Next.js.</li>
          <li>📊 Manage tasks with a smart, recruiter‑friendly dashboard.</li>
        </motion.ul>
        <p className="text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} MyApp. Built for learning, growth, and impact.
        </p>
      </footer>
    </div>
  );
}