'use client';

import { useState } from 'react';
import Link from 'next/link';
import albumsData from '../../../data/albums.json';
import postsData from '../../../data/posts.json';
import musicData from '../../../data/music.json';
import socialLinksData from '../../../data/social-links.json';
import type { Album, Photo, Post, Music, SocialLink } from '@/types';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'albums' | 'posts' | 'music' | 'social'>('albums');
  const [albums, setAlbums] = useState<Album[]>(albumsData as Album[]);
  const [posts, setPosts] = useState<Post[]>(postsData as Post[]);
  const [music, setMusic] = useState<Music[]>(musicData as Music[]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(socialLinksData as SocialLink[]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [managingAlbumId, setManagingAlbumId] = useState<string | null>(null);
  const [showPhotoForm, setShowPhotoForm] = useState(false);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [photoFormData, setPhotoFormData] = useState<any>({});

  const generateId = () => Date.now().toString();

  const handleAddAlbum = () => {
    const newAlbum: Album = {
      id: generateId(),
      title: formData.title || '',
      description: formData.description || '',
      coverImage: formData.coverImage || '',
      date: formData.date || new Date().toISOString().split('T')[0],
      tags: (formData.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean),
      photos: []
    };
    setAlbums([newAlbum, ...albums]);
    setShowForm(false);
    setFormData({});
  };

  const handleEditAlbum = () => {
    setAlbums(albums.map(album => {
      if (album.id === editingId) {
        return {
          ...album,
          title: formData.title || album.title,
          description: formData.description || album.description,
          coverImage: formData.coverImage || album.coverImage,
          date: formData.date || album.date,
          tags: formData.tags ? formData.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : album.tags
        };
      }
      return album;
    }));
    setShowForm(false);
    setEditingId(null);
    setFormData({});
  };

  const handleDeleteAlbum = (id: string) => {
    if (confirm('确定要删除这个相册吗？')) {
      setAlbums(albums.filter(album => album.id !== id));
    }
  };

  const handleAddPost = () => {
    const newPost: Post = {
      id: generateId(),
      title: formData.title || '',
      date: formData.date || new Date().toISOString().split('T')[0],
      isMood: formData.isMood !== undefined ? formData.isMood : true,
      content: formData.content || ''
    };
    setPosts([newPost, ...posts]);
    setShowForm(false);
    setFormData({});
  };

  const handleEditPost = () => {
    setPosts(posts.map(post => {
      if (post.id === editingId) {
        return {
          ...post,
          title: formData.title || post.title,
          date: formData.date || post.date,
          isMood: formData.isMood !== undefined ? formData.isMood : post.isMood,
          content: formData.content || post.content
        };
      }
      return post;
    }));
    setShowForm(false);
    setEditingId(null);
    setFormData({});
  };

  const handleDeletePost = (id: string) => {
    if (confirm('确定要删除这条记录吗？')) {
      setPosts(posts.filter(post => post.id !== id));
    }
  };

  const handleAddMusic = () => {
    const newMusic: Music = {
      id: generateId(),
      title: formData.title || '',
      artist: formData.artist || '',
      album: formData.album || '',
      coverUrl: formData.coverUrl || '',
      url: formData.url || '',
      platform: formData.platform || 'netease'
    };
    setMusic([newMusic, ...music]);
    setShowForm(false);
    setFormData({});
  };

  const handleEditMusic = () => {
    setMusic(music.map(m => {
      if (m.id === editingId) {
        return {
          ...m,
          title: formData.title || m.title,
          artist: formData.artist || m.artist,
          album: formData.album || m.album,
          coverUrl: formData.coverUrl || m.coverUrl,
          url: formData.url || m.url,
          platform: formData.platform || m.platform
        };
      }
      return m;
    }));
    setShowForm(false);
    setEditingId(null);
    setFormData({});
  };

  const handleDeleteMusic = (id: string) => {
    if (confirm('确定要删除这首音乐吗？')) {
      setMusic(music.filter(m => m.id !== id));
    }
  };

  const handleAddSocial = () => {
    const newSocial: SocialLink = {
      id: generateId(),
      platform: formData.platform || 'xiaohongshu',
      title: formData.title || '',
      url: formData.url || '',
      thumbnailUrl: formData.thumbnailUrl || ''
    };
    setSocialLinks([newSocial, ...socialLinks]);
    setShowForm(false);
    setFormData({});
  };

  const handleEditSocial = () => {
    setSocialLinks(socialLinks.map(s => {
      if (s.id === editingId) {
        return {
          ...s,
          platform: formData.platform || s.platform,
          title: formData.title || s.title,
          url: formData.url || s.url,
          thumbnailUrl: formData.thumbnailUrl || s.thumbnailUrl
        };
      }
      return s;
    }));
    setShowForm(false);
    setEditingId(null);
    setFormData({});
  };

  const handleDeleteSocial = (id: string) => {
    if (confirm('确定要删除这条社交媒体链接吗？')) {
      setSocialLinks(socialLinks.filter(s => s.id !== id));
    }
  };

  const handleSave = () => {
    const data = {
      albums,
      posts,
      music,
      socialLinks
    };
    
    const blob = new Blob([JSON.stringify(data.albums, null, 2)], { type: 'application/json' });
    const url1 = URL.createObjectURL(blob);
    const a1 = document.createElement('a');
    a1.href = url1;
    a1.download = 'albums.json';
    a1.click();
    URL.revokeObjectURL(url1);
    
    const blob2 = new Blob([JSON.stringify(data.posts, null, 2)], { type: 'application/json' });
    const url2 = URL.createObjectURL(blob2);
    const a2 = document.createElement('a');
    a2.href = url2;
    a2.download = 'posts.json';
    a2.click();
    URL.revokeObjectURL(url2);
    
    const blob3 = new Blob([JSON.stringify(data.music, null, 2)], { type: 'application/json' });
    const url3 = URL.createObjectURL(blob3);
    const a3 = document.createElement('a');
    a3.href = url3;
    a3.download = 'music.json';
    a3.click();
    URL.revokeObjectURL(url3);
    
    const blob4 = new Blob([JSON.stringify(data.socialLinks, null, 2)], { type: 'application/json' });
    const url4 = URL.createObjectURL(blob4);
    const a4 = document.createElement('a');
    a4.href = url4;
    a4.download = 'social-links.json';
    a4.click();
    URL.revokeObjectURL(url4);
    
    alert('数据已下载！请将 JSON 文件替换到项目的 data/ 目录，然后提交到 GitHub。');
  };

  const openEditForm = (item: any) => {
    setEditingId(item.id);
    setFormData(item);
    setShowForm(true);
  };

  const getCurrentAlbum = () => {
    return albums.find(album => album.id === managingAlbumId);
  };

  const handleAddPhoto = () => {
    if (!managingAlbumId) return;
    const newPhoto: Photo = {
      id: generateId(),
      title: photoFormData.title || '',
      url: photoFormData.url || '',
      tags: (photoFormData.tags || '').split(',').map((t: string) => t.trim()).filter(Boolean)
    };
    setAlbums(albums.map(album => {
      if (album.id === managingAlbumId) {
        return { ...album, photos: [newPhoto, ...album.photos] };
      }
      return album;
    }));
    setShowPhotoForm(false);
    setPhotoFormData({});
  };

  const handleEditPhoto = () => {
    if (!managingAlbumId || !editingPhotoId) return;
    setAlbums(albums.map(album => {
      if (album.id === managingAlbumId) {
        return {
          ...album,
          photos: album.photos.map(photo => {
            if (photo.id === editingPhotoId) {
              return {
                ...photo,
                title: photoFormData.title || photo.title,
                url: photoFormData.url || photo.url,
                tags: photoFormData.tags ? photoFormData.tags.split(',').map((t: string) => t.trim()).filter(Boolean) : photo.tags
              };
            }
            return photo;
          })
        };
      }
      return album;
    }));
    setShowPhotoForm(false);
    setEditingPhotoId(null);
    setPhotoFormData({});
  };

  const handleDeletePhoto = (photoId: string) => {
    if (!managingAlbumId || !confirm('确定要删除这张照片吗？')) return;
    setAlbums(albums.map(album => {
      if (album.id === managingAlbumId) {
        return { ...album, photos: album.photos.filter(photo => photo.id !== photoId) };
      }
      return album;
    }));
  };

  const openPhotoEditForm = (photo: Photo) => {
    setEditingPhotoId(photo.id);
    setPhotoFormData(photo);
    setShowPhotoForm(true);
  };

  return (
    <main className="min-h-screen flex flex-col relative" style={{ backgroundImage: 'url(https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=peony%20flowers%20border%20frame%2C%20white%20center%20space%20for%20text%2C%20elegant%20watercolor%20style%2C%20pink%20peonies%2C%20empty%20middle%20area%2C%20decorative%20floral%20border&image_size=landscape_16_9)', backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundAttachment: 'fixed' }}>
      <div className="absolute inset-0 bg-white/40 pointer-events-none"></div>
      <header className="py-16 px-6 border-b border-pink-100 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-light mb-4 text-pink-600 tracking-wide" style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontStyle: 'italic' }}>
            Every Day is New
          </h1>
          <Link href="/" className="text-sm text-gray-500 hover:text-pink-500 hover:underline mb-2 inline-block">
            ← 返回网站
          </Link>
          <p className="text-gray-500 text-lg">数据管理</p>
        </div>
      </header>

      <nav className="py-4 px-6 border-b border-pink-100 bg-white/80 sticky top-0 z-50 backdrop-blur-sm relative">
        <div className="max-w-6xl mx-auto flex gap-2 flex-wrap">
          <div className="flex gap-6">
            <Link href="/" className="font-medium hover:text-pink-500 transition-colors text-gray-700">首页</Link>
            <Link href="/albums" className="font-medium hover:text-pink-500 transition-colors text-gray-700">相册</Link>
            <Link href="/posts" className="font-medium hover:text-pink-500 transition-colors text-gray-700">心情</Link>
            <Link href="/music" className="font-medium hover:text-pink-500 transition-colors text-gray-700">音乐</Link>
          </div>
          <div className="flex-1"></div>
        </div>
      </nav>

      <nav className="py-4 px-6 border-b border-pink-100 bg-white/80 relative z-10">
        <div className="max-w-6xl mx-auto flex gap-2 flex-wrap">
          <button
            onClick={() => { setActiveTab('albums'); setShowForm(false); setEditingId(null); setFormData({}); setManagingAlbumId(null); }}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'albums' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-pink-50'
            }`}
          >
            相册
          </button>
          <button
            onClick={() => { setActiveTab('posts'); setShowForm(false); setEditingId(null); setFormData({}); setManagingAlbumId(null); }}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'posts' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-pink-50'
            }`}
          >
            心情
          </button>
          <button
            onClick={() => { setActiveTab('music'); setShowForm(false); setEditingId(null); setFormData({}); setManagingAlbumId(null); }}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'music' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-pink-50'
            }`}
          >
            音乐
          </button>
          <button
            onClick={() => { setActiveTab('social'); setShowForm(false); setEditingId(null); setFormData({}); setManagingAlbumId(null); }}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === 'social' ? 'bg-pink-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-pink-50'
            }`}
          >
            社交媒体
          </button>
          <div className="flex-1"></div>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
          >
            下载全部数据
          </button>
        </div>
      </nav>

      <section className="py-8 px-6 flex-1 relative z-10">
        <div className="max-w-6xl mx-auto">
          {activeTab === 'albums' && managingAlbumId ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setManagingAlbumId(null)}
                    className="px-3 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
                  >
                    ← 返回相册列表
                  </button>
                  <h2 className="text-xl font-semibold text-gray-800">
                    管理照片：{getCurrentAlbum()?.title}
                  </h2>
                </div>
                <button
                  onClick={() => { setPhotoFormData({}); setShowPhotoForm(true); }}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                >
                  + 添加照片
                </button>
              </div>

              {!showPhotoForm ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {getCurrentAlbum()?.photos.map(photo => (
                    <div key={photo.id} className="bg-white rounded-lg border border-pink-100 overflow-hidden">
                      <img src={photo.url} alt={photo.title || '照片'} className="w-full h-48 object-cover" />
                      <div className="p-4">
                        <h3 className="font-medium text-gray-800">{photo.title || '无标题'}</h3>
                        {photo.tags.length > 0 && (
                          <p className="text-sm text-gray-500 mt-1">{photo.tags.join(', ')}</p>
                        )}
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => openPhotoEditForm(photo)}
                            className="flex-1 px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                          >
                            编辑
                          </button>
                          <button
                            onClick={() => handleDeletePhoto(photo.id)}
                            className="flex-1 px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm"
                          >
                            删除
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {getCurrentAlbum()?.photos.length === 0 && (
                    <div className="col-span-full text-center py-12 bg-white rounded-lg border border-pink-100">
                      <p className="text-gray-500">这个相册还没有照片，点击「+ 添加照片」来添加吧！</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-pink-100 p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">
                    {editingPhotoId ? '编辑照片' : '添加照片'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">图片 URL *</label>
                      <input
                        type="text"
                        value={photoFormData.url || ''}
                        onChange={(e) => setPhotoFormData({ ...photoFormData, url: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="https://example.com/photo.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
                      <input
                        type="text"
                        value={photoFormData.title || ''}
                        onChange={(e) => setPhotoFormData({ ...photoFormData, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="输入照片标题"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">标签（用逗号分隔）</label>
                      <input
                        type="text"
                        value={photoFormData.tags?.join(', ') || ''}
                        onChange={(e) => setPhotoFormData({ ...photoFormData, tags: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="风景, 日落, 海边"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 mt-8">
                    <button
                      onClick={() => { setShowPhotoForm(false); setEditingPhotoId(null); setPhotoFormData({}); }}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      取消
                    </button>
                    <button
                      onClick={() => editingPhotoId ? handleEditPhoto() : handleAddPhoto()}
                      className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                    >
                      {editingPhotoId ? '保存修改' : '添加'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : !showForm ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {activeTab === 'albums' && '相册列表'}
                  {activeTab === 'posts' && '心情列表'}
                  {activeTab === 'music' && '音乐列表'}
                  {activeTab === 'social' && '社交媒体列表'}
                </h2>
                <button
                  onClick={() => { setFormData({}); setShowForm(true); }}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                >
                  + 新增
                </button>
              </div>

              <div className="space-y-3">
                {activeTab === 'albums' && albums.map(album => (
                  <div key={album.id} className="bg-white rounded-lg border border-pink-100 p-4 flex items-center gap-4">
                    {album.coverImage && (
                      <img src={album.coverImage} alt={album.title} className="w-16 h-16 rounded-lg object-cover" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{album.title}</h3>
                      <p className="text-sm text-gray-500">{album.date} · {album.tags.join(', ')} · {album.photos.length} 张照片</p>
                    </div>
                    <button
                      onClick={() => setManagingAlbumId(album.id)}
                      className="px-3 py-1 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors text-sm"
                    >
                      管理照片
                    </button>
                    <button
                      onClick={() => openEditForm(album)}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => handleDeleteAlbum(album.id)}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm"
                    >
                      删除
                    </button>
                  </div>
                ))}

                {activeTab === 'posts' && posts.map(post => (
                  <div key={post.id} className="bg-white rounded-lg border border-pink-100 p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium text-gray-800">{post.title || '无标题'}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${post.isMood ? 'bg-pink-100 text-pink-600' : 'bg-blue-100 text-blue-600'}`}>
                            {post.isMood ? '心情' : '博客'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{post.date}</p>
                        <p className="text-sm text-gray-600 mt-2 line-clamp-2">{post.content}</p>
                      </div>
                      <button
                        onClick={() => openEditForm(post)}
                        className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                      >
                        编辑
                      </button>
                      <button
                        onClick={() => handleDeletePost(post.id)}
                        className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm"
                      >
                        删除
                      </button>
                    </div>
                  </div>
                ))}

                {activeTab === 'music' && music.map(m => (
                  <div key={m.id} className="bg-white rounded-lg border border-pink-100 p-4 flex items-center gap-4">
                    {m.coverUrl && (
                      <img src={m.coverUrl} alt={m.title} className="w-12 h-12 rounded-lg object-cover" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{m.title}</h3>
                      <p className="text-sm text-gray-500">{m.artist} · {m.album}</p>
                    </div>
                    <button
                      onClick={() => openEditForm(m)}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => handleDeleteMusic(m.id)}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm"
                    >
                      删除
                    </button>
                  </div>
                ))}

                {activeTab === 'social' && socialLinks.map(s => (
                  <div key={s.id} className="bg-white rounded-lg border border-pink-100 p-4 flex items-center gap-4">
                    {s.thumbnailUrl && (
                      <img src={s.thumbnailUrl} alt={s.title} className="w-12 h-12 rounded-lg object-cover" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-800">{s.title}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-600">
                          {s.platform === 'xiaohongshu' ? '小红书' : '微博'}
                        </span>
                      </div>
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm text-pink-500 hover:underline">
                        {s.url}
                      </a>
                    </div>
                    <button
                      onClick={() => openEditForm(s)}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => handleDeleteSocial(s.id)}
                      className="px-3 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors text-sm"
                    >
                      删除
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-pink-100 p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                {editingId ? '编辑' : '新增'}
                {activeTab === 'albums' && '相册'}
                {activeTab === 'posts' && '心情'}
                {activeTab === 'music' && '音乐'}
                {activeTab === 'social' && '社交媒体'}
              </h2>

              <div className="space-y-4">
                {activeTab === 'albums' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">标题 *</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="输入相册标题"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">描述</label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        rows={3}
                        placeholder="输入相册描述"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">封面图片 URL</label>
                      <input
                        type="text"
                        value={formData.coverImage || ''}
                        onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">日期</label>
                      <input
                        type="date"
                        value={formData.date || ''}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">标签（用逗号分隔）</label>
                      <input
                        type="text"
                        value={formData.tags?.join(', ') || ''}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="风景, 旅行, 日常"
                      />
                    </div>
                  </>
                )}

                {activeTab === 'posts' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="输入标题（可选）"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">日期</label>
                      <input
                        type="date"
                        value={formData.date || ''}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">类型</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={formData.isMood !== false}
                            onChange={() => setFormData({ ...formData, isMood: true })}
                            className="w-4 h-4 text-pink-500"
                          />
                          心情
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            checked={formData.isMood === false}
                            onChange={() => setFormData({ ...formData, isMood: false })}
                            className="w-4 h-4 text-pink-500"
                          />
                          博客
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">内容 *</label>
                      <textarea
                        value={formData.content || ''}
                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        rows={6}
                        placeholder="写下你的心情..."
                      />
                    </div>
                  </>
                )}

                {activeTab === 'music' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">歌曲名 *</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="输入歌曲名"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">艺术家 *</label>
                      <input
                        type="text"
                        value={formData.artist || ''}
                        onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="输入艺术家"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">专辑</label>
                      <input
                        type="text"
                        value={formData.album || ''}
                        onChange={(e) => setFormData({ ...formData, album: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="输入专辑名"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">封面图片 URL</label>
                      <input
                        type="text"
                        value={formData.coverUrl || ''}
                        onChange={(e) => setFormData({ ...formData, coverUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="https://example.com/cover.jpg"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">音乐链接</label>
                      <input
                        type="text"
                        value={formData.url || ''}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="https://music.163.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">平台</label>
                      <select
                        value={formData.platform || 'netease'}
                        onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      >
                        <option value="netease">网易云音乐</option>
                        <option value="qq">QQ 音乐</option>
                        <option value="other">其他</option>
                      </select>
                    </div>
                  </>
                )}

                {activeTab === 'social' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">平台</label>
                      <select
                        value={formData.platform || 'xiaohongshu'}
                        onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      >
                        <option value="xiaohongshu">小红书</option>
                        <option value="weibo">微博</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">标题 *</label>
                      <input
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="输入标题"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">链接 *</label>
                      <input
                        type="text"
                        value={formData.url || ''}
                        onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="https://xiaohongshu.com/..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">缩略图 URL</label>
                      <input
                        type="text"
                        value={formData.thumbnailUrl || ''}
                        onChange={(e) => setFormData({ ...formData, thumbnailUrl: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="https://example.com/thumb.jpg"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="flex gap-3 mt-8">
                <button
                  onClick={() => { setShowForm(false); setEditingId(null); setFormData({}); }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                >
                  取消
                </button>
                <button
                  onClick={() => {
                    if (activeTab === 'albums') {
                      editingId ? handleEditAlbum() : handleAddAlbum();
                    } else if (activeTab === 'posts') {
                      editingId ? handleEditPost() : handleAddPost();
                    } else if (activeTab === 'music') {
                      editingId ? handleEditMusic() : handleAddMusic();
                    } else if (activeTab === 'social') {
                      editingId ? handleEditSocial() : handleAddSocial();
                    }
                  }}
                  className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                >
                  {editingId ? '保存修改' : '新增'}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <footer className="py-6 px-6 border-t border-pink-100 bg-white/80 relative z-10">
        <div className="max-w-6xl mx-auto text-center text-gray-500">
          <p>编辑完成后，点击右上角「下载全部数据」，将下载的 JSON 文件替换到项目的 data/ 目录，然后提交到 GitHub 即可更新</p>
        </div>
      </footer>
    </main>
  );
}
