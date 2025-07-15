import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <motion.div
      className="text-center py-16 px-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.h1
        className="text-4xl font-extrabold mb-4 text-primary"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Welcome to URL Analyzer
      </motion.h1>

      <motion.p
        className="text-lg text-gray-600 max-w-xl mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Quickly analyze any website URL for metadata like headings, link stats,
        login forms, and HTML versions — all in one place.
      </motion.p>

      <motion.div
        className="mt-8"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.4 }}
      >
        <Link
          to="/urls"
          className="inline-block px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition"
        >
          Start Analyzing
        </Link>
      </motion.div>
    </motion.div>
  );
}
