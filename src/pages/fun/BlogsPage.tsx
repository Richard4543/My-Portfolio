// src/pages/fun/BlogsPage.tsx
import { useState } from 'react';

interface Post {
  id: string;
  title: string;
  category: string;
  excerpt: string;
}

const allPosts: Post[] = Array.from({ length: 30 }, (_, i) => ({
  id: `post${i + 1}`,
  title: `Sample Post Title ${i + 1}`,
  category: ['PC', 'Web', 'Game'][i % 3],
  excerpt: `This is a short excerpt for post ${i + 1}.`,
}));

export function BlogsPage() {
  const [visible, setVisible] = useState(10);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(allPosts.map(p => p.category)))];

  const filtered = allPosts
    .filter(p => (category === 'All' || p.category === category))
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  const displayed = filtered.slice(0, visible);

  const handleSearchClick = (title: string) => {
    const el = document.getElementById(title.replace(/\s+/g, ''));
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="flex flex-col md:flex-row md:items-start">
      {/* Category Sidebar */}
      <aside className="md:w-1/4 mb-8 md:mb-0 px-4">
        <h3 className="font-semibold mb-2">Categories</h3>
        <ul className="space-y-1">
          {categories.map(cat => (
            <li key={cat}>
              <button
                className={`w-full text-left px-2 py-1 rounded ${
                  category === cat ? 'bg-blue-100' : ''
                }`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="md:w-3/4 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-center">Blogs</h2>

          {/* Search & Dropdown */}
          <div className="mb-6 text-center relative">
            <input
              type="text"
              placeholder="Search posts..."
              className="border border-gray-300 rounded px-4 py-2 w-full"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && (
              <ul className="absolute top-full left-0 mt-1 border border-gray-200 bg-white shadow-lg w-full">
                {filtered.slice(0, 5).map(p => (
                  <li
                    key={p.id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSearchClick(p.title)}
                  >
                    {p.title}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Posts List */}
          <div className="space-y-8">
            {displayed.map(p => (
              <article
                key={p.id}
                id={p.title.replace(/\s+/g, '')}
                className="bg-white shadow-lg rounded p-6 scroll-mt-24"
              >
                <h3 className="text-2xl font-semibold mb-2">{p.title}</h3>
                <p className="text-gray-600 mb-4">Category: {p.category}</p>
                <p className="text-gray-700">{p.excerpt}</p>
              </article>
            ))}
          </div>

          {/* Load More */}
          {visible < filtered.length && (
            <div className="text-center mt-8">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                onClick={() => setVisible(v => v + 10)}
              >
                View More
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
