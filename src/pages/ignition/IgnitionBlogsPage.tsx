// src/pages/ignition/IgnitionBlogsPage.tsx
import React, {
  useState,
  useEffect,
  useRef,
  useLayoutEffect,
  FC,
} from 'react'
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

const MAX_PREVIEW_HEIGHT = 200  // px
const PAGE_SIZE          = 10   // posts per “page”

// ——— Code block renderers ———————————————————————————————————
// Preview: wraps long lines
const previewComponents = {
  code: (props: any) => {
    const { inline, className, children } = props
    if (inline) {
      return <code className={className}>{children}</code>
    }
    return (
      <pre className="break-all whitespace-pre-wrap bg-gray-100 rounded p-4 my-4">
        <code className={className}>{children}</code>
      </pre>
    )
  },
}

// Full-view modal: horizontal scroll
const fullComponents = {
  code: (props: any) => {
    const { inline, className, children } = props
    if (inline) {
      return <code className={className}>{children}</code>
    }
    return (
      <pre className="overflow-x-auto bg-gray-100 rounded p-4 my-4">
        <code className={className}>{children}</code>
      </pre>
    )
  },
}

// ——— PostCard sub-component ————————————————————————————
interface PostCardProps {
  post: Post
  onViewFull: (p: Post) => void
}
const PostCard: FC<PostCardProps> = ({ post, onViewFull }) => {
  const fullText   = post.content ?? post.excerpt
  const previewRef = useRef<HTMLDivElement>(null)
  const [overflowed, setOverflowed] = useState(false)

  useLayoutEffect(() => {
    const el = previewRef.current
    if (el) {
      setOverflowed(el.scrollHeight > MAX_PREVIEW_HEIGHT)
    }
  }, [fullText])

  return (
    <article className="max-w-xl bg-white mx-auto shadow-lg rounded p-6 scroll-mt-32">
      <h3 className="text-2xl font-semibold mb-2">{post.title}</h3>
      <p className="text-gray-600 mb-4">Category: {post.category}</p>

      {post.videoUrl && (
        <div className="mb-4">
          <iframe
            src={post.videoUrl}
            width="100%"
            height="200"
            allowFullScreen
            className="rounded"
          />
        </div>
      )}

      {/* Preview container: capped height */}
      <div
        ref={previewRef}
        className="prose max-w-none mb-4 overflow-hidden"
        style={{ maxHeight: `${MAX_PREVIEW_HEIGHT}px` }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={previewComponents}
        >
          {fullText}
        </ReactMarkdown>
      </div>

      {overflowed ? (
        <button
          onClick={() => onViewFull(post)}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          View Full
        </button>
      ) : post.url ? (
        <a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
        >
          Read more…
        </a>
      ) : null}
    </article>
  )
}

// ——— Main component —————————————————————————————————————
export default function IgnitionBlogsPage() {
  const [allPosts, setAllPosts]   = useState<Post[]>([])
  const [search, setSearch]       = useState('')
  const [category, setCategory]   = useState('All')
  const [visible, setVisible]     = useState(PAGE_SIZE)
  const [modalPost, setModalPost] = useState<Post | null>(null)

  useEffect(() => {
    fetch('/data/posts.json')
      .then(r => r.json())
      .then(setAllPosts)
      .catch(console.error)
  }, [])

  const categories = ['All', ...Array.from(new Set(allPosts.map(p => p.category)))]
  const filtered   = allPosts
    .filter(p => category === 'All' || p.category === category)
    .filter(p => p.title.toLowerCase().includes(search.toLowerCase()))
  const displayed  = filtered.slice(0, visible)

  return (
    <>
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

        {/* Main */}
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
                    onClick={() =>
                      document.getElementById(p.id)?.scrollIntoView({
                        behavior: 'smooth',
                      })
                    }
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
              <PostCard key={p.id} post={p} onViewFull={setModalPost} />
            ))}
          </div>

          {/* Load More */}
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

      {/* Full-view modal */}
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
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={fullComponents}
              >
                {modalPost.content ?? modalPost.excerpt}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
