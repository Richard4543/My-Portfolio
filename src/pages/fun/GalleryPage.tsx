import { useState } from 'react';
// Place your GIFs under src/assets/imagesGIF/
// Use Vite's glob import updated syntax:
const ALL_GIFS = Object.values(
  import.meta.glob('../../../public/imagesGIF/*.gif', { eager: true, query: '?url', import: 'default' })
) as string[];

const PAGE_SIZE = 100;

export default function GalleryPage() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const visibleGifs = ALL_GIFS.slice(0, visibleCount);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-6 text-center">GIF Gallery</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
        {visibleGifs.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`fun-gif-${idx}`}
            className="w-full h-auto object-cover rounded-md shadow-sm"
          />
        ))}
      </div>

      {visibleCount < ALL_GIFS.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleCount(v => v + PAGE_SIZE)}
            className="bg-gray-700 text-white px-6 py-2 rounded-full shadow hover:bg-indigo-700 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}