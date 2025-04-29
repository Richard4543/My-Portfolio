// src/pages/fun/BlogsPage.tsx
import React, { useState, useEffect } from 'react';

interface Post {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  videoUrl?: string;
  url: string;
}

export function BlogsPage() {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [visible, setVisible] = useState(10);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  // 1) Load posts.json at runtime
  useEffect(() => {
    fetch('/data/posts.json')
      .then(res => res.json())
      .then((data: Post[]) => setAllPosts(data))
      .catch(console.error);
  }, []);

  // 2) Build category list (All + unique categories)
  const categories = ['All', ...Array.from(new Set(allPosts.map(p => p.category)))];

  // 3) Filter by category & search term
  const filtered = allPosts
    .filter(p => category === 'All' || p.category === category)
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  // 4) Paginate
  const displayed = filtered.slice(0, visible);

  // 5) Scroll into view helper
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
      {/* Sidebar */}
      <aside className="px-4">
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
      <main className="px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Blogs</h2>

        {/* Search */}
        <div className="relative mb-12">
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full border border-gray-300 rounded px-4 py-2"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <ul className="absolute top-full left-0 mt-1 w-full border border-gray-200 bg-white shadow-lg z-50">
              {filtered.slice(0, 5).map(p => (
                <li
                  key={p.id}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => scrollTo(p.id)}
                >
                  {p.title}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Posts */}
        <div className="space-y-12">
          {displayed.map(p => (
            <article
              key={p.id}
              id={p.id}
              className="max-w-xl mx-auto bg-white shadow-lg rounded p-6 scroll-mt-32"
            >
              <h3 className="text-2xl font-semibold mb-2">{p.title}</h3>
              <p className="text-gray-600 mb-4">Category: {p.category}</p>

              {/* Optional YouTube embed */}
              {p.videoUrl && (
                <div className="mb-4">
                  <iframe
                    src={p.videoUrl}
                    width="100%"
                    height="300"
                    allowFullScreen
                    className="rounded"
                  />
                </div>
              )}

              <p className="text-gray-700 mb-4">{p.excerpt}</p>

              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                Read more…
              </a>
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
      </main>
    </div>
  );
}
