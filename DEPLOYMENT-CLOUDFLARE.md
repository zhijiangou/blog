# GitHub + Cloudflare 部署指南

## 方案概述

使用 **GitHub**（代码托管）+ **Cloudflare Pages**（网站托管）+ **Cloudflare D1**（数据库）+ **Cloudflare R2**（图片存储）

✅ **优势**：
- Cloudflare 全球 CDN，访问速度快
- 免费额度充足
- D1 是 SQLite 边缘数据库，开发简单
- R2 对象存储无出站流量费用

---

## 第一步：配置 Git 并推送到 GitHub

### 1. 配置 Git 用户信息

```bash
git config user.email "your-email@example.com"
git config user.name "Your Name"
```

### 2. 提交代码

```bash
git add .
git commit -m "Initial commit - Personal blog"
```

### 3. 在 GitHub 上创建新仓库

1. 访问 https://github.com/new
2. 创建一个新仓库（不要初始化 README）
3. 复制仓库的 HTTPS 地址

### 4. 推送到 GitHub

```bash
git remote add origin https://github.com/你的用户名/仓库名.git
git branch -M main
git push -u origin main
```

---

## 第二步：使用 Cloudflare Pages 部署

### 1. 注册/登录 Cloudflare

访问 https://dash.cloudflare.com 并注册/登录账号

### 2. 创建 Pages 项目

1. 在侧边栏点击 "Workers & Pages"
2. 点击 "Create" → "Pages"
3. 选择 "Connect to Git"
4. 选择刚才推送到 GitHub 的仓库
5. 点击 "Begin setup"

### 3. 配置构建设置

**Framework preset**: 选择 `Next.js`

**Build command**: 保持自动（`npm run build`）

**Build output directory**: 保持自动（`.next`）

**Root directory**: 保持为 `./`

### 4. 点击 "Save and Deploy"

等待 1-3 分钟，部署完成后您会获得一个网站地址（如 `https://your-blog.pages.dev`）

---

## 第三步：设置 Cloudflare D1 数据库

### 1. 创建 D1 数据库

1. 在 Cloudflare Dashboard 进入 "Workers & Pages" → "D1"
2. 点击 "Create database"
3. 输入数据库名称（如 `blog-db`）
4. 点击 "Create"

### 2. 创建数据库表

在 D1 数据库的 "Console" 中执行以下 SQL：

```sql
-- 创建相册表
CREATE TABLE albums (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  cover_image TEXT,
  date TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 创建相册标签表
CREATE TABLE album_tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  album_id TEXT,
  tag TEXT NOT NULL,
  FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE
);

-- 创建照片表
CREATE TABLE photos (
  id TEXT PRIMARY KEY,
  album_id TEXT,
  title TEXT,
  url TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (album_id) REFERENCES albums(id) ON DELETE CASCADE
);

-- 创建照片标签表
CREATE TABLE photo_tags (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  photo_id TEXT,
  tag TEXT NOT NULL,
  FOREIGN KEY (photo_id) REFERENCES photos(id) ON DELETE CASCADE
);

-- 创建文章/心情表
CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  title TEXT,
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  is_mood INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 创建音乐表
CREATE TABLE music (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  album TEXT,
  cover_url TEXT,
  url TEXT,
  platform TEXT DEFAULT 'netease',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- 创建社交媒体表
CREATE TABLE social_links (
  id TEXT PRIMARY KEY,
  platform TEXT NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

### 3. 获取数据库 ID

在数据库设置页面复制 "Database ID"

---

## 第四步：（可选）设置 Cloudflare R2 图片存储

如果您想在网站上直接上传图片而不是使用 URL：

### 1. 创建 R2 存储桶

1. 在 Cloudflare Dashboard 进入 "R2"
2. 点击 "Create bucket"
3. 输入名称（如 `blog-images`）
4. 点击 "Create bucket"

### 2. 配置 CORS

在存储桶设置 → "CORS Policy" 中添加：

```json
[
  {
    "AllowedOrigins": ["https://your-blog.pages.dev"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedHeaders": ["*"]
  }
]
```

---

## 第五步：配置项目以使用 Cloudflare

### 1. 安装 Cloudflare 相关依赖

```bash
npm install @cloudflare/next-on-pages --save-dev
npm install wrangler --save-dev
```

### 2. 创建 wrangler.toml 配置文件

在项目根目录创建 `wrangler.toml`：

```toml
name = "your-blog"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"
database_name = "blog-db"
database_id = "您的D1数据库ID"

# 如果使用 R2
# [[r2_buckets]]
# binding = "BUCKET"
# bucket_name = "blog-images"
```

### 3. 修改 next.config.js

创建或修改 `next.config.js`：

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
}

module.exports = nextConfig
```

### 4. 修改 package.json scripts

在 `package.json` 中添加：

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "pages:build": "npx @cloudflare/next-on-pages",
    "preview": "npx wrangler pages dev .vercel/output/static --compatibility-date=2024-01-01 --d1=blog-db"
  }
}
```

---

## 临时方案：如果暂时不想改代码

如果您想快速部署但暂时不想修改代码集成数据库，可以：

1. 先按上述步骤部署到 Cloudflare Pages
2. 修改管理页面，把"保存"功能改回"下载 JSON 文件"
3. 每次在本地修改后，下载 JSON 文件，提交到 GitHub
4. Cloudflare Pages 会自动重新部署

---

## 常见问题

### Q: Cloudflare Pages 支持 Next.js 的 API 路由吗？
A: 是的，完全支持！使用 `@cloudflare/next-on-pages` 可以完美运行。

### Q: D1 数据库和 SQLite 有什么区别？
A: D1 是基于 SQLite 的边缘数据库，语法基本一样，但部署在 Cloudflare 全球网络上。

### Q: 免费额度是多少？
A: 
- Cloudflare Pages: 无限站点，100GB/月流量
- D1: 5GB 存储，500万次读取/月
- R2: 10GB 存储，Class A 操作 100万次/月

---

## 需要帮助？

如果需要我帮您修改代码以集成 Cloudflare D1，请告诉我！
