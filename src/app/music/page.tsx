'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import musicData from '../../../data/music.json';
import type { Music } from '@/types';

export default function MusicPage() {
  const musicList = musicData as Music[];
  const [currentTrack, setCurrentTrack] = useState<Music | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playTrack = (track: Music) => {
    setCurrentTrack(track);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.play().catch(e => console.log('Playback failed:', e));
    }
  };

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
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-5xl font-light mb-4 text-pink-600 tracking-wide" style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontStyle: 'italic' }}>
            Every Day is New
          </h1>
          <p className="text-gray-500 text-lg">我喜欢的歌</p>
        </div>
      </header>
      
      <nav className="py-4 px-6 border-b border-pink-100 bg-white/95 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex gap-6 flex-wrap">
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
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {musicList.map(track => (
              <div
                key={track.id}
                className={`flex items-center gap-4 p-4 border border-pink-100 bg-white rounded-lg cursor-pointer hover:bg-pink-50 transition-colors ${
                  currentTrack?.id === track.id ? 'bg-pink-50' : ''
                }`}
                onClick={() => playTrack(track)}
              >
                {track.coverUrl ? (
                  <img
                    src={track.coverUrl}
                    alt={track.title}
                    className="w-16 h-16 rounded-md object-cover border border-pink-100"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-md bg-pink-100 flex items-center justify-center border border-pink-200">
                    <svg className="w-8 h-8 text-pink-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
                    </svg>
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{track.title}</h3>
                  <p className="text-sm text-gray-500">
                    {track.artist}
                    {track.album && ` · ${track.album}`}
                  </p>
                </div>
                {currentTrack?.id === track.id && (
                  <div className="text-pink-500">
                    <svg className="w-6 h-6 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-pink-100 p-4 relative z-10">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            {currentTrack.coverUrl && (
              <img
                src={currentTrack.coverUrl}
                alt={currentTrack.title}
                className="w-12 h-12 rounded-md object-cover border border-pink-100"
              />
            )}
            <div className="flex-1">
              <p className="font-medium text-gray-800">{currentTrack.title}</p>
              <p className="text-sm text-gray-500">{currentTrack.artist}</p>
            </div>
            <audio
              ref={audioRef}
              src={currentTrack.url}
              controls
              className="w-64"
            />
          </div>
        </div>
      )}
    </main>
  );
}
