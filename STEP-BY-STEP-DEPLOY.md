# 分步部署指南 - GitHub + Cloudflare Pages

## 目标：先让网站上线，再逐步完善功能

---

## 📋 当前状态

您的网站已经准备好了！管理页面可以：
- ✅ 编辑相册、照片、文章、音乐、社交媒体
- ✅ 点击「下载全部数据」下载 JSON 文件
- ✅ 替换 JSON 文件到 `data/` 目录后提交到 GitHub 即可更新

---

## 🚀 第一步：推送到 GitHub

### 1. 配置 Git 用户信息

在终端运行：

```bash
git config user.email "你的邮箱@example.com"
git config user.name "你的名字"
```

### 2. 提交代码

```bash
git add .
git commit -m "Initial commit - Personal blog with peony background"
```

### 3. 在 GitHub 创建新仓库

1. 访问：https://github.com/new
2. 填写仓库名称（如 `my-personal-blog`）
3. **不要**勾选 "Initialize this repository with a README"
4. 点击 "Create repository"

### 4. 推送到 GitHub

复制 GitHub 页面上显示的命令，类似：

```bash
git remote add origin https://github.com/你的用户名/仓库名.git
git branch -M main
git push -u origin main
```

---

## 🌐 第二步：在 Cloudflare Pages 部署

### 1. 注册/登录 Cloudflare

访问：https://dash.cloudflare.com

### 2. 创建 Pages 项目

1. 在左侧菜单点击 **"Workers & Pages"**
2. 点击 **"Create"** → **"Pages"**
3. 选择 **"Connect to Git"**
4. 选择刚才推送到 GitHub 的仓库
5. 点击 **"Begin setup"**

### 3. 配置项目（非常重要！）

**Project name**: 输入一个名字（如 `my-personal-blog`）

**Production branch**: `main`

**Framework preset**: 选择 **`Next.js`**

**Build command**: 保持自动（`npm run build`）

**Build output directory**: 保持自动（`.next`）

**Root directory**: 保持为 `./`

### 4. 点击 **"Save and Deploy"**

等待 1-3 分钟，部署完成后您会获得一个网站地址！

类似：`https://my-personal-blog.pages.dev`

---

## 📝 第三步：如何更新内容

### 工作流程

1. **在本地开发服务器编辑**
   - 运行 `npm run dev`
   - 访问 http://localhost:3000/admin
   - 修改内容

2. **下载数据**
   - 在管理页面点击「下载全部数据」
   - 会下载 4 个 JSON 文件

3. **替换文件**
   - 将下载的文件替换到项目的 `data/` 目录

4. **提交并推送**
   ```bash
   git add .
   git commit -m "Update content"
   git push
   ```

5. **自动部署**
   - Cloudflare Pages 会自动检测到 GitHub 更新
   - 1-2 分钟后网站就更新了！

---

## 🔮 后续：集成 Cloudflare D1（可选）

等网站成功上线后，如果您想让管理页面直接保存数据（不需要下载 JSON），我们可以：

1. 在 Cloudflare 创建 D1 数据库
2. 创建数据库表
3. 修改 API 路由使用 D1
4. 修改页面从 D1 读取数据

到时候再找我帮您完成！

---

## ❓ 常见问题

### Q: 免费额度够吗？
A: 完全够！
- Cloudflare Pages: 无限站点，100GB/月流量
- GitHub: 无限公开仓库

### Q: 可以用自己的域名吗？
A: 可以！在 Cloudflare Pages 设置中可以添加自定义域名。

### Q: 部署失败怎么办？
A: 检查：
1. `next.config.js` 配置正确（没有 `output: 'export'`）
2. Framework preset 选的是 `Next.js`
3. 查看 Cloudflare 的构建日志

---

## 🎉 开始部署吧！

按照上面的第一步开始，您的网站很快就能上线了！
