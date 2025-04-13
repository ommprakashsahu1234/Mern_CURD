import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-gray-400 sticky top-0 w-full p-4 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Curd App</h1>
        <button
          className="md:hidden text-yellow-400 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-white transition">
            Login
          </Link>
          <Link to="/home" className="hover:text-white transition">
            Dashboard
          </Link>
          <Link to="/update" className="hover:text-white transition">
            Update
          </Link>
          <Link to="/register" className="hover:text-white transition">
            Register
          </Link>
          <Link to="/delete" className="hover:text-white transition">
            Delete
          </Link>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden flex flex-col space-y-4 mt-4 p-4 bg-gray-800 rounded-lg"
          >
            <Link
              to="/"
              className="hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/home"
              className="hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              to="/update"
              className="hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Update
            </Link>
            <Link
              to="/register"
              className="hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
            <Link
              to="/delete"
              className="hover:text-white transition"
              onClick={() => setIsOpen(false)}
            >
              Delete
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Header;
