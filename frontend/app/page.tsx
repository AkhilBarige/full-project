"use client";

export default function HomePage() {
  return (
    <div className="bg-gray-500 text-white">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl font-extrabold mb-6">
          Organize Your Tasks, Simplify Your Life
        </h1>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          A clean, secure, and collaborative task manager built with Next.js,
          Express, MongoDB, and Tailwind CSS.
        </p>
        <div className="space-x-4">
          <a
            href="/dashboard"
            className="bg-gray-900 text-white px-6 py-3 rounded font-semibold hover:bg-gray-700 transition"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="bg-transparent border border-white px-6 py-3 rounded font-semibold hover:bg-white hover:text-gray-900 transition"
          >
            Login
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 grid md:grid-cols-3 gap-8 text-center bg-gray-700 text-white">
        <div className="px-6 rounded-lg hover:bg-gray-600 transition">
          <h3 className="text-xl font-semibold mb-2">🔒 Secure Authentication</h3>
          <p className="text-gray-300">
            JWT + OTP fallback ensures your data stays safe and private.
          </p>
        </div>
        <div className="p-6 rounded-lg hover:bg-gray-600 transition">
          <h3 className="text-xl font-semibold mb-2">⚡ Fast & Responsive</h3>
          <p className="text-gray-300">
            Optimized with Next.js and Tailwind CSS for smooth performance.
          </p>
        </div>
        <div className="p-6 rounded-lg hover:bg-gray-600 transition">
          <h3 className="text-xl font-semibold mb-2">📊 Smart Dashboard</h3>
          <p className="text-gray-300">
            Track, update, and manage tasks effortlessly with a modern UI.
          </p>
        </div>
      </section>

      {/* Demo Preview Section */}
      <section className="py-16 px-6 bg-gray-700 text-center">
        <h2 className="text-2xl font-bold mb-6">Preview Your Dashboard</h2>
        <div className="max-w-md mx-auto bg-gray-800 rounded-lg p-6 shadow">
          <h3 className="text-lg font-semibold">Sample Task</h3>
          <p className="text-gray-300 mt-2">This is how your tasks will look.</p>
          <span className="inline-block mt-3 text-sm font-medium px-2 py-1 rounded bg-yellow-600 text-white">
            ❌ Pending
          </span>
        </div>
      </section>

      {/* Footer*/}
      <footer className="bg-gray-900 text-white text-center py-10">
        <h2 className="text-2xl font-bold mb-4">✨ Why Choose MyApp?</h2>
        <ul className="list-disc list-inside max-w-xl mx-auto text-gray-300 space-y-2 text-left">
          <li>🚀 Boost productivity with a clean, clutter‑free interface.</li>
          <li>🔒 Stay secure with JWT + OTP authentication.</li>
          <li>⚡ Experience lightning‑fast performance powered by Next.js.</li>
          <li>📊 Manage tasks with a smart, recruiter‑friendly dashboard.</li>
        </ul>
        <p className="text-gray-500 text-sm mt-6">
          © {new Date().getFullYear()} MyApp. Built for learning, growth, and impact.
        </p>
      </footer>
    </div>
  );
}