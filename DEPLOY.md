# 个人博客 — 部署指南

## 技术栈

| 技术 | 用途 |
|------|------|
| Astro 5 | 静态站点生成框架 |
| Tailwind CSS | 样式框架 |
| Decap CMS | 在线写文章管理后台 |
| GitHub Pages | 免费静态托管 |
| GitHub Actions | 自动构建部署 |
| PWA | 安装为桌面/手机 App |

---

## 一、准备工作

### 1. 创建 GitHub 仓库

1. 登录 GitHub，点击右上角 `+` → `New repository`
2. 仓库名填写：`YOUR_USERNAME.github.io`（替换为你的用户名）
3. 设置为 **Public**（GitHub Pages 免费版需要公开仓库）
4. 不要勾选任何初始化选项，点击 `Create repository`

### 2. 修改配置文件

**修改 `astro.config.mjs`**，将 `YOUR_GITHUB_USERNAME` 替换为你的 GitHub 用户名：
```js
site: 'https://YOUR_USERNAME.github.io',
```

**修改 `public/admin/config.yml`**，填入你的 GitHub 信息：
```yaml
backend:
  name: github
  repo: YOUR_USERNAME/YOUR_USERNAME.github.io
  branch: main
```

**修改 `src/components/Footer.astro`** 中的 GitHub 链接。

---

## 二、推送代码到 GitHub

在 `my-blog` 目录下执行：

```bash
git init
git add .
git commit -m "feat: initial blog setup"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git
git push -u origin main
```

---

## 三、配置 GitHub Pages

1. 打开仓库页面，进入 **Settings** → **Pages**
2. **Source** 选择 `GitHub Actions`
3. 等待第一次 Actions 构建完成（1-2分钟）
4. 访问 `https://YOUR_USERNAME.github.io` 即可看到博客！

---

## 四、配置在线写文章（Decap CMS）

### 4.1 配置 GitHub OAuth App

1. 进入 GitHub → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**
2. 填写：
   - Application name: `Blog CMS`
   - Homepage URL: `https://YOUR_USERNAME.github.io`
   - Authorization callback URL: `https://YOUR_USERNAME.github.io/admin/`
3. 点击 **Register application**，记录 `Client ID` 和 `Client Secret`

### 4.2 部署认证服务（免费）

使用 Cloudflare Workers 部署 [sveltia-cms-auth](https://github.com/sveltia/sveltia-cms-auth)：

```bash
# 安装 Wrangler
npm install -g wrangler

# 克隆认证服务
git clone https://github.com/sveltia/sveltia-cms-auth.git
cd sveltia-cms-auth
npm install

# 配置环境变量
wrangler secret put GITHUB_CLIENT_ID
wrangler secret put GITHUB_CLIENT_SECRET

# 部署
wrangler deploy
```

部署成功后会得到一个 URL（如 `https://sveltia-cms-auth.YOUR_USERNAME.workers.dev`），填入 `config.yml` 的 `base_url`。

### 4.3 开始写文章

访问 `https://YOUR_USERNAME.github.io/admin`，用 GitHub 账号登录，即可在线写文章！

写完点击 **Publish**，GitHub Actions 会自动构建并发布，约1分钟后上线。

---

## 五、安装为 App（PWA）

博客已内置 PWA 支持：

**在手机上：**
- iOS：Safari 打开博客 → 分享 → 添加到主屏幕
- Android：Chrome 打开博客 → 菜单 → 安装应用

**在桌面：**
- Chrome/Edge：地址栏右侧会出现安装图标，点击安装

---

## 六、本地开发

```bash
cd my-blog
npm install
npm run dev
```

打开 `http://localhost:4321` 预览博客。

---

## 七、自定义域名（可选）

1. 在域名服务商添加 CNAME 记录：`@ → YOUR_USERNAME.github.io`
2. 在 GitHub 仓库 **Settings** → **Pages** → **Custom domain** 填入域名
3. 勾选 **Enforce HTTPS**

---

## 目录结构

```
my-blog/
├── src/
│   ├── content/
│   │   └── blog/           # 文章 Markdown 文件
│   ├── layouts/
│   │   ├── BaseLayout.astro # 基础布局
│   │   └── BlogPost.astro   # 文章布局
│   ├── components/
│   │   ├── Header.astro     # 顶部导航
│   │   └── Footer.astro     # 底部
│   ├── pages/
│   │   ├── index.astro      # 首页
│   │   ├── blog/            # 文章列表和详情
│   │   └── about.astro      # 关于页
│   └── styles/
│       └── global.css       # 全局样式
├── public/
│   ├── admin/               # Decap CMS 后台
│   │   ├── index.html
│   │   └── config.yml
│   └── icons/               # PWA 图标
├── .github/
│   └── workflows/
│       └── deploy.yml       # 自动部署
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```
