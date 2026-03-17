import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import albumsData from '../../../../data/albums.json';
import type { Album } from '@/types';

export async function generateStaticParams() {
  return (albumsData as Album[]).map((album) => ({
    id: album.id,
  }));
}

export default function AlbumDetailPage({ params }: { params: { id: string } }) {
  const album = (albumsData as Album[]).find(a => a.id === params.id);

  if (!album) {
    return (
      <main className="min-h-screen flex flex-col relative" style={{ backgroundImage: 'url(https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=peony%20flowers%20border%20frame%2C%20white%20center%20space%20for%20text%2C%20elegant%20watercolor%20style%2C%20pink%20peonies%2C%20empty%20middle%20area%2C%20decorative%20floral%20border&image_size=landscape_16_9)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
        <div className="absolute inset-0 bg-white/40 pointer-events-none"></div>
        <header className="py-16 px-6 border-b border-pink-100 relative z-10 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-4 -left-4 w-32 h-32 text-pink-200 opacity-50 rotate-12">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="20" />
                <ellipse cx="35" cy="35" rx="15" ry="25" transform="rotate(-45 35 35)" />
                <ellipse cx="65" cy="35" rx="15" ry="25" transform="rotate(45 65 35)" />
                <ellipse cx="35" cy="65" rx="15" ry="25" transform="rotate(45 35 65)" />
                <ellipse cx="65" cy="65" rx="15" ry="25" transform="rotate(-45 65 65)" />
              </svg>
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 text-pink-300 opacity-40 -rotate-12">
              <svg viewBox="0 0 100 100" fill="currentColor">
                <circle cx="50" cy="50" r="20" />
                <ellipse cx="35" cy="35" rx="15" ry="25" transform="rotate(-45 35 35)" />
                <ellipse cx="65" cy="35" rx="15" ry="25" transform="rotate(45 65 35)" />
                <ellipse cx="35" cy="65" rx="15" ry="25" transform="rotate(45 35 65)" />
                <ellipse cx="65" cy="65" rx="15" ry="25" transform="rotate(-45 65 65)" />
              </svg>
            </div>
          </div>
          <div className="max-w-6xl mx-auto text-center relative z-10">
            <h1 className="text-5xl font-light mb-4 text-pink-600 tracking-wide" style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontStyle: 'italic' }}>
              Every Day is New
            </h1>
            <p className="text-gray-500 text-lg">相册未找到</p>
          </div>
        </header>
        <nav className="py-4 px-6 border-b border-pink-100 bg-white/95 sticky top-0 z-50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto flex gap-6 flex-wrap">
            <div className="flex gap-6">
              <Link href="/" className="font-medium hover:text-pink-500 transition-colors text-gray-700">首页</Link>
              <Link href="/albums" className="font-medium hover:text-pink-500 transition-colors text-gray-700">相册</Link>
              <Link href="/posts" className="font-medium hover:text-pink-500 transition-colors text-gray-700">心情</Link>
              <Link href="/music" className="font-medium hover:text-pink-500 transition-colors text-gray-700">音乐</Link>
            </div>
            <div className="ml-auto">
              <Link href="/admin" className="font-medium hover:text-pink-500 transition-colors text-gray-700">
                管理
              </Link>
            </div>
          </div>
        </nav>
        <section className="py-12 px-6 flex-1 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-500">该相册不存在</p>
            <Link href="/albums" className="inline-block mt-4 text-pink-500 hover:underline">
              返回相册列表
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col relative" style={{ backgroundImage: 'url(https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=peony%20flowers%20border%20frame%2C%20white%20center%20space%20for%20text%2C%20elegant%20watercolor%20style%2C%20pink%20peonies%2C%20empty%20middle%20area%2C%20decorative%20floral%20border&image_size=landscape_16_9)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
      <div className="absolute inset-0 bg-white/40 pointer-events-none"></div>
      <header className="py-16 px-6 border-b border-pink-100 relative z-10 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-4 -left-4 w-32 h-32 text-pink-200 opacity-50 rotate-12">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="20" />
              <ellipse cx="35" cy="35" rx="15" ry="25" transform="rotate(-45 35 35)" />
              <ellipse cx="65" cy="35" rx="15" ry="25" transform="rotate(45 65 35)" />
              <ellipse cx="35" cy="65" rx="15" ry="25" transform="rotate(45 35 65)" />
              <ellipse cx="65" cy="65" rx="15" ry="25" transform="rotate(-45 65 65)" />
            </svg>
          </div>
          <div className="absolute -bottom-6 -right-6 w-40 h-40 text-pink-300 opacity-40 -rotate-12">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <circle cx="50" cy="50" r="20" />
              <ellipse cx="35" cy="35" rx="15" ry="25" transform="rotate(-45 35 35)" />
              <ellipse cx="65" cy="35" rx="15" ry="25" transform="rotate(45 65 35)" />
              <ellipse cx="35" cy="65" rx="15" ry="25" transform="rotate(45 35 65)" />
              <ellipse cx="65" cy="65" rx="15" ry="25" transform="rotate(-45 65 65)" />
            </svg>
          </div>
        </div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-5xl font-light mb-4 text-pink-600 tracking-wide" style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontStyle: 'italic' }}>
            Every Day is New
          </h1>
          <Link href="/albums" className="text-sm text-gray-500 hover:text-pink-500 hover:underline mb-4 inline-block transition-colors">
            ← 返回相册
          </Link>
          <h2 className="text-3xl font-bold mb-2 text-gray-800">{album.title}</h2>
          <p className="text-gray-500">
            {format(parseISO(album.date), 'yyyy年MM月dd日', { locale: zhCN })}
          </p>
          {album.description && (
            <p className="mt-4 text-lg text-gray-700">{album.description}</p>
          )}
          <div className="flex flex-wrap gap-2 mt-4 justify-center">
            {album.tags.map(tag => (
              <span key={tag} className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>
      
      <nav className="py-4 px-6 border-b border-pink-100 bg-white/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto flex gap-6 flex-wrap">
          <div className="flex gap-6">
            <Link href="/" className="font-medium hover:text-pink-500 transition-colors text-gray-700">首页</Link>
            <Link href="/albums" className="font-medium hover:text-pink-500 transition-colors text-gray-700">相册</Link>
            <Link href="/posts" className="font-medium hover:text-pink-500 transition-colors text-gray-700">心情</Link>
            <Link href="/music" className="font-medium hover:text-pink-500 transition-colors text-gray-700">音乐</Link>
          </div>
          <div className="ml-auto">
            <Link href="/admin" className="font-medium hover:text-pink-500 transition-colors text-gray-700">
              管理
            </Link>
          </div>
        </div>
      </nav>

      <section className="py-12 px-6 flex-1 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {album.photos.map(photo => (
              <div key={photo.id} className="group">
                <div className="aspect-[3/4] overflow-hidden rounded-lg border border-pink-100 bg-white shadow-sm">
                  <img
                    src={photo.url}
                    alt={photo.title || '照片'}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {photo.title && (
                  <p className="mt-2 text-sm text-gray-600">{photo.title}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
