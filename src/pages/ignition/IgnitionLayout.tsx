import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import IgnitionBlogsPage from './IgnitionBlogsPage';
import CodeSnippetsPage from './CodeSnippetsPage';
import FileExamplesPage from './FileExamplesPage';

export default function IgnitionLayout(){
    return(
        <div className="min-h-screen pt-16">
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
                    to="/ignition/IgnitionBlogsPage"
                    className={({ isActive }) =>
                        isActive ? 'text-blue-500 font-semibold' : 'text-gray-700'
                    }
                    >
                    Blogs
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to="/ignition/CodeSnippetsPage"
                    className={({ isActive }) =>
                        isActive ? 'text-blue-500 font-semibold' : 'text-gray-700'
                    }
                    >
                    Code Snippets
                    </NavLink>
                </li>
                <li>
                    <NavLink
                    to="/ignition/FileExamplesPage"
                    className={({ isActive }) =>
                        isActive ? 'text-blue-500 font-semibold' : 'text-gray-700'
                    }
                    >
                    File Example
                    </NavLink>
                </li>
                </ul>
            </nav>

            <div className="pt-20 px-4 max-w-4xl mx-auto">
                <Routes>
                    <Route path="blogs" element={<IgnitionBlogsPage />} />
                    <Route path="snippets" element={<CodeSnippetsPage />} />
                    <Route path="files" element={<FileExamplesPage />} />
                    <Route path="" element={<Navigate to="blogs" replace />} />
                </Routes>
            </div>
        </div>
    )
}

