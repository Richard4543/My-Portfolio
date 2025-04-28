import { NavLink, Routes, Route, Navigate } from 'react-router-dom';
import { BlogsPage } from './BlogsPage';
import { LivePage } from './LivePage';
import { GuestbookPage } from './GuestbookPage';

export default function FunLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#cabcb1] to-white pt-16">
      {/* Floating pill-style nav */}
      <nav
        className="
          fixed
          top-4
          left-1/2 transform -translate-x-1/2
          bg-white
          shadow-lg
          rounded-full
          px-8 py-2
          z-20
        "
      >
        <ul className="flex items-center space-x-12">
          <li>
            <NavLink
              to="/fun/blogs"
              className={({ isActive }) =>
                isActive ? 'text-blue-500 font-semibold' : 'text-gray-700'
              }
            >
              Blogs
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fun/live"
              className={({ isActive }) =>
                isActive ? 'text-blue-500 font-semibold' : 'text-gray-700'
              }
            >
              Live
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/fun/guestbook"
              className={({ isActive }) =>
                isActive ? 'text-blue-500 font-semibold' : 'text-gray-700'
              }
            >
              Guestbook
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* Nested routes content */}
      <div className="pt-20 px-4 max-w-4xl mx-auto">
        <Routes>
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="live" element={<LivePage />} />
          <Route path="guestbook" element={<GuestbookPage />} />
          <Route path="" element={<Navigate to="blogs" replace />} />
        </Routes>
      </div>
    </div>
  );
}
