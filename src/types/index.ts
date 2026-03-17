export interface Photo {
  id: number;
  title?: string;
  url: string;
  tags: string[];
}

export interface Album {
  id: string;
  title: string;
  description?: string;
  coverImage: string;
  date: string;
  tags: string[];
  photos: Photo[];
}

export interface Post {
  id: string;
  title?: string;
  date: string;
  isMood: boolean;
  content: string;
}

export interface SocialLink {
  id: number;
  platform: 'xiaohongshu' | 'weibo';
  title: string;
  url: string;
  thumbnailUrl?: string;
}

export interface Music {
  id: number;
  title: string;
  artist: string;
  album?: string;
  coverUrl?: string;
  url: string;
  platform: 'netease' | 'spotify';
}
