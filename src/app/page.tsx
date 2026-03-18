'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import albumsData from '../../data/albums.json';
import postsData from '../../data/posts.json';
import socialLinksData from '../../data/social-links.json';
import type { Album, Post, SocialLink, Photo } from '@/types';

interface PhotoWithAlbum extends Photo {
  albumId: string;
  albumTitle: string;
  albumDescription?: string;
  albumDate: string;
  albumTags: string[];
}

const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export default function Home() {
  const albums = albumsData as Album[];
  const posts = postsData as Post[];
  const socialLinks = socialLinksData as SocialLink[];
  const latestPosts = posts.slice(0, 3);
  const [showNav, setShowNav] = useState(false);
  const [displayAlbums, setDisplayAlbums] = useState<Album[]>(albums);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDisplayAlbums(shuffleArray(albums));
    
    const handleScroll = () => {
      const header = document.querySelector('header');
      if (header) {
        const headerHeight = header.offsetHeight;
        setShowNav(window.scrollY > headerHeight);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [albums]);

  return (
    <main className="min-h-screen flex flex-col relative" style={{ backgroundImage: 'url(https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=peony%20flowers%20border%20frame%2C%20white%20center%20space%20for%20text%2C%20elegant%20watercolor%20style%2C%20pink%20peonies%2C%20empty%20middle%20area%2C%20decorative%20floral%20border&image_size=landscape_16_9)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
      <div className="absolute inset-0 bg-white/40 pointer-events-none"></div>
      <header className="pt-40 pb-10 px-12 relative z-10">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-8xl font-light mb-14 text-pink-500 tracking-wide" style={{ fontFamily: "'Comic Sans MS', 'Marker Felt', 'Bradley Hand', cursive" }}>
            Every Day is New
          </h1>
          <p className="text-gray-300 text-lg" style={{ fontFamily: "'Comic Sans MS', 'Marker Felt', 'Bradley Hand', cursive" }}>Design by iHakulamatata9</p>
        </div>
      </header>
      
      {showNav && (
        <nav className="py-4 px-6 border-b border-pink-100 bg-white/80 sticky top-0 z-50 backdrop-blur-sm transition-all duration-300 relative">
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
      )}

      <section className="py-8 px-6 flex-1 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {displayAlbums.map((album) => (
                <Link
                  key={album.id}
                  href={`/albums/${album.id}`}
                  className="group block"
                >
                  <div className="relative rounded-xl overflow-hidden mb-3 border border-pink-100 bg-white shadow-sm aspect-[3/4]">
                    <img
                      src={album.coverImage}
                      alt={album.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-sm group-hover:text-pink-500 transition-colors text-gray-700">
                      {album.title}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {album.date}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      {album.tags.slice(0, 4).map(tag => (
                        <span key={tag} className="text-xs bg-pink-100 text-pink-700 px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">最新心情</h2>
              <Link href="/posts" className="text-pink-500 hover:underline">查看全部 →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestPosts.map((post) => (
                <Link key={post.id} href={`/posts/${post.id}`} className="group block p-6 border border-pink-100 bg-white rounded-lg hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2 py-1 text-xs rounded ${
                      post.isMood ? 'bg-pink-100 text-pink-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {post.isMood ? '心情' : '博客'}
                    </span>
                  </div>
                  {post.title && (
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-pink-500 transition-colors text-gray-800">{post.title}</h3>
                  )}
                  <p className="text-xs text-gray-400 mb-3">{post.date}</p>
                  <p className="text-gray-600 line-clamp-3">{post.content}</p>
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">社交媒体</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {socialLinks.map(link => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border border-pink-100 bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {link.thumbnailUrl && (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={link.thumbnailUrl}
                        alt={link.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">
                        {link.platform === 'xiaohongshu' ? (
                          <div className="w-7 h-7 rounded overflow-hidden flex items-center justify-center bg-gray-100">
                            <img src="/redbook.png" alt="小红书" className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className="w-7 h-7 rounded overflow-hidden flex items-center justify-center bg-gray-100">
                            <img src="/weibo.png" alt="微博" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </span>
                      <span className="text-sm font-medium text-gray-500">
                        {link.platform === 'xiaohongshu' ? '小红书' : '微博'}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-800">{link.title}</h3>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">快速导航</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link href="/albums" className="p-6 border border-pink-100 bg-white rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">相册</h3>
                <p className="text-gray-600">查看我的照片</p>
              </Link>
              <Link href="/posts" className="p-6 border border-pink-100 bg-white rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">心情</h3>
                <p className="text-gray-600">记录点滴</p>
              </Link>
              <Link href="/music" className="p-6 border border-pink-100 bg-white rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">音乐</h3>
                <p className="text-gray-600">我喜欢的歌</p>
              </Link>
            </div>
          </section>
        </div>
      </section>

      <footer className="py-6 px-6 border-t border-pink-100 bg-white/80 relative z-10">
        <div className="max-w-6xl mx-auto text-center text-gray-500">
          <p>© 2024 Every Day is New</p>
        </div>
      </footer>
    </main>
  );
}
