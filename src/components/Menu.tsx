import  { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Menu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Menu Button (placed in a fixed position) */}
      <div className="absolute top-4 right-4 z-30">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 focus:outline-none bg-white rounded shadow"
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Collapsible Side Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-500"
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute top-0 right-0 bg-white w-64 h-full p-4 transition-transform duration-500 transform"
            style={{ transform: menuOpen ? 'translateX(0)' : 'translateX(100%)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <ul className="mt-8 space-y-4">
              <li>
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  <span className="block text-xl hover:text-gray-700">Home</span>
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={() => setMenuOpen(false)}>
                  <span className="block text-xl hover:text-gray-700">About</span>
                </Link>
              </li>
              <li>
                <Link to="/work" onClick={() => setMenuOpen(false)}>
                  <span className="block text-xl hover:text-gray-700">My Work</span>
                </Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => setMenuOpen(false)}>
                  <span className="block text-xl hover:text-gray-700">Contact</span>
                </Link>
              </li>
              <li>
                <Link to="/fun" onClick={() => setMenuOpen(false)}>
                  <span className="block text-xl hover:text-gray-700">Fun</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
