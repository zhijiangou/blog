'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format, parseISO, startOfYear, endOfYear, eachMonthOfInterval } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import albumsData from '../../../data/albums.json';
import type { Album } from '@/types';

export default function AlbumsPage() {
  const albums = albumsData as Album[];
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null);

  const allTags = Array.from(new Set(albums.flatMap(album => album.tags)));

  const years = Array.from(new Set(albums.map(album => 
    format(parseISO(album.date), 'yyyy')
  ))).sort((a, b) => b.localeCompare(a));

  const getMonthsForYear = (year: string) => {
    const yearAlbums = albums.filter(album => 
      format(parseISO(album.date), 'yyyy') === year
    );
    const months = Array.from(new Set(yearAlbums.map(album => 
      format(parseISO(album.date), 'yyyy-MM')
    ))).sort((a, b) => b.localeCompare(a));
    return months;
  };

  const filteredAlbums = albums.filter(album => {
    const matchesTag = selectedTag ? album.tags.includes(selectedTag) : true;
    const matchesMonth = selectedMonth 
      ? format(parseISO(album.date), 'yyyy-MM') === selectedMonth 
      : true;
    return matchesTag && matchesMonth;
  });

  return (
    <main className="min-h-screen flex flex-col relative" style={{ backgroundImage: 'url(https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=peony%20flowers%20border%20frame%2C%20white%20center%20space%20for%20text%2C%20elegant%20watercolor%20style%2C%20pink%20peonies%2C%20empty%20middle%20area%2C%20decorative%20floral%20border&image_size=landscape_16_9)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
      <div className="absolute inset-0 bg-white/40 pointer-events-none"></div>
      <header className="py-16 px-6 border-b border-pink-100 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-light mb-4 text-pink-600 tracking-wide" style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontStyle: 'italic' }}>
            Every Day is New
          </h1>
          <p className="text-gray-500 text-lg">我的照片记录</p>
        </div>
      </header>
      
      <nav className="py-4 px-6 border-b border-pink-100 bg-white/80 sticky top-0 z-50 backdrop-blur-sm relative">
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
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1 space-y-6">
              <div>
                <h3 className="font-semibold mb-3 text-gray-800">标签</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedTag(null)}
                    className={`px-3 py-1 text-sm rounded-full border border-pink-200 ${
                      selectedTag === null ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 hover:bg-pink-50'
                    } transition-colors`}
                  >
                    全部
                  </button>
                  {allTags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`px-3 py-1 text-sm rounded-full border border-pink-200 ${
                        selectedTag === tag ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 hover:bg-pink-50'
                      } transition-colors`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3 text-gray-800">日历</h3>
                <div className="space-y-3">
                  {years.map(year => (
                    <div key={year}>
                      <div className="font-medium mb-2 text-gray-700">{year}年</div>
                      <div className="flex flex-wrap gap-1">
                        <button
                          onClick={() => setSelectedMonth(null)}
                          className={`px-2 py-1 text-xs rounded border border-pink-200 ${
                            selectedMonth === null ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 hover:bg-pink-50'
                          } transition-colors`}
                        >
                          全部
                        </button>
                        {getMonthsForYear(year).map(month => (
                          <button
                            key={month}
                            onClick={() => setSelectedMonth(month)}
                            className={`px-2 py-1 text-xs rounded border border-pink-200 ${
                              selectedMonth === month ? 'bg-pink-500 text-white' : 'bg-white text-gray-700 hover:bg-pink-50'
                            } transition-colors`}
                          >
                            {format(parseISO(month + '-01'), 'M月', { locale: zhCN })}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </aside>

            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredAlbums.map(album => (
                  <Link
                    key={album.id}
                    href={`/albums/${album.id}`}
                    className="group border border-pink-100 bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={album.coverImage}
                        alt={album.title}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-lg mb-1 text-gray-800">{album.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {format(parseISO(album.date), 'yyyy年MM月dd日', { locale: zhCN })}
                      </p>
                      {album.description && (
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {album.description}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1 mt-3">
                        {album.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 text-xs bg-pink-100 text-pink-700 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              
              {filteredAlbums.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  没有找到符合条件的相册
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
