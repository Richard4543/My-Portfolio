import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface Post {
  id: string
  title: string
  category: string
  excerpt: string
  videoUrl?: string
  url: string
  content?: string
}

const WORD_LIMIT = 20
const PAGE_SIZE = 10

export default function IgnitionBlogsPage() {
  const [allPosts, setAllPosts] = useState<Post[]>([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [visible, setVisible] = useState<number>(PAGE_SIZE)
  const [modalPost, setModalPost] = useState<Post | null>(null)

  useEffect(() => {
    fetch('/data/posts.json')
      .then(r => r.json())
      .then(setAllPosts)
      .catch(console.error)
  }, [])

  const categories = ['All', ...Array.from(new Set(allPosts.map(p => p.category)))]
  const filtered = allPosts
    .filter(p => category === 'All' || p.category === category)
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
  const displayed = filtered.slice(0, visible)

  // Utility to truncate text while preserving code fence blocks
  const truncate = (text: string) => {
    const words = text.split(/\s+/)
    if (words.length <= WORD_LIMIT) return text
    return words.slice(0, WORD_LIMIT).join(' ') + ' …'
  }

  // Custom ReactMarkdown code renderer
  const renderers = {
    code({ inline, className, children }: any) {
      if (inline) {
        return <code className={className ?? ''}>{children}</code>
      }
      return (
        <pre className="overflow-x-auto bg-gray-100 rounded p-4 my-4">
          <code className={className ?? ''}>{children}</code>
        </pre>
      )
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8">
        <aside className="px-4">
          <h3 className="font-semibold mb-2">Categories</h3>
          <ul className="space-y-1">
            {categories.map(cat => (
              <li key={cat}>
                <button
                  className={`w-full text-left px-2 py-1 rounded ${category === cat ? 'bg-blue-100' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Blogs</h2>

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
                    onClick={() => document.getElementById(p.id)?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    {p.title}
                  </li>
                ))}
              </ul>
            )}

          </div>

          <div className="space-y-12">
            {displayed.map(p => {
              const fullText = p.content ?? p.excerpt
              const isLong = fullText.split(/\s+/).length > WORD_LIMIT

              return (
                <article key={p.id} id={p.id} className="max-w-xl mx-auto bg-white shadow-lg rounded p-6 scroll-mt-32">
                  <h3 className="text-2xl font-semibold mb-2">{p.title}</h3>
                  <p className="text-gray-600 mb-4">Category: {p.category}</p>

                  {p.videoUrl && (
                    <div className="mb-4">
                      <iframe
                        src={p.videoUrl}
                        width="100%"
                        height="200"
                        allowFullScreen
                        className="rounded"
                      />
                    </div>
                  )}

                  {/* Markdown */}
                  <div className="prose max-w-none mb-4">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        code: (props: any) => {
                          const { inline, className, children } = props;
                          if (inline) {
                            return (
                              <code className={className ?? ''}>
                                {children}
                              </code>
                            );
                          }
                          return (
                            <pre className="overflow-x-auto bg-gray-100 rounded p-4 my-4">
                              <code className={className ?? ''}>
                                {children}
                              </code>
                            </pre>
                          );
                        }
                      }}
                    >
                      {p.content}
                    </ReactMarkdown>
                  </div>

                  {isLong ? (
                    <button
                      onClick={() => setModalPost(p)}
                      className="mt-4 bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
                    >
                      View Full
                    </button>
                  ) : (
                    p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-block bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
                      >
                        Read more…
                      </a>
                    )
                  )}
                </article>
              )
            })}
          </div>

          {visible < filtered.length && (
            <div className="flex justify-center mt-8">
              <button
                onClick={() => setVisible(v => v + PAGE_SIZE)}
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium px-6 py-2 rounded-full shadow-lg hover:opacity-90 transition"
              >
                View More
              </button>
            </div>
          )}
        </main>
      </div>

      {modalPost && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={() => setModalPost(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full max-h-full overflow-auto p-6 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setModalPost(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-4">{modalPost.title}</h2>
            {modalPost.videoUrl && (
              <div className="mb-4">
                <iframe
                  src={modalPost.videoUrl}
                  width="100%"
                  height="300"
                  allowFullScreen
                  className="rounded"
                />
              </div>
            )}
            <div className="prose max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={renderers}>
                {modalPost.content ?? modalPost.excerpt}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
