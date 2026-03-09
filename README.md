# 个人简历网页 | Personal Resume Website

一个现代化的个人简历网页，支持中英文切换，响应式设计，可部署在 GitHub Pages 上。

A modern personal resume website with Chinese/English language switching, responsive design, and deployable on GitHub Pages.

## ✨ 特性 | Features

- 🌐 **中英文切换** - 一键切换中英文内容
- 📱 **响应式设计** - 完美适配桌面、平板和手机
- 🎨 **现代化UI** - 简洁优雅的设计风格
- ⚡ **快速加载** - 纯静态文件，加载迅速
- 🎭 **动画效果** - 滚动动画、悬停效果
- 🔗 **社交链接** - 集成 LinkedIn、GitHub、邮箱等
- 📊 **数据展示** - 时间线、卡片式项目展示

## 🚀 快速开始 | Quick Start

### 本地预览 | Local Preview

1. 克隆或下载此项目
2. 用浏览器直接打开 `index.html` 文件
3. 或者使用本地服务器：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js (需要安装 http-server)
npx http-server

# 使用 VS Code Live Server 插件
```

## 📦 部署到 GitHub Pages | Deploy to GitHub Pages

### 方法一：直接上传文件 | Method 1: Direct Upload

1. 在 GitHub 上创建一个新的仓库（例如：`resume`）
2. 将以下文件上传到仓库根目录：
   - `index.html`
   - `styles.css`
   - `script.js`
3. 进入仓库的 **Settings** 页面
4. 在左侧菜单找到 **Pages**
5. 在 **Source** 下选择 **Deploy from a branch**
6. 分支选择 `main`（或 `master`），文件夹选择 `/root`
7. 点击 **Save**
8. 等待几分钟，你的网站将在 `https://yourusername.github.io/resume/` 上线

### 方法二：使用 GitHub CLI | Method 2: Using GitHub CLI

```bash
# 安装 GitHub CLI (如果还没安装)
# macOS: brew install gh
# Windows: winget install --id GitHub.cli

# 登录 GitHub
gh auth login

# 创建仓库并上传
git init
git add .
git commit -m "Initial commit: Personal resume website"
gh repo create resume --public --source=.
git push -u origin main
```

然后在 GitHub 仓库设置中启用 GitHub Pages（如方法一步骤 3-7）

### 方法三：自定义域名 | Method 3: Custom Domain

1. 在仓库根目录创建 `CNAME` 文件
2. 在文件中写入你的域名（例如：`yourname.com`）
3. 在域名提供商处添加 DNS 记录：
   - 类型：`CNAME`
   - 名称：`@`（或你的子域名）
   - 值：`yourusername.github.io`

## 🎨 自定义 | Customization

### 修改个人信息

编辑 `index.html`，搜索以下内容并替换：

```html
<!-- 姓名 -->
<h1 class="hero-title" data-zh="你的名字" data-en="Your Name">

<!-- 职位 -->
<p class="hero-subtitle" data-zh="你的职位" data-en="Your Title">

<!-- 个人简介 -->
<p class="hero-description" data-zh="你的简介..." data-en="Your bio...">

<!-- 联系方式 -->
<a href="mailto:your.email@example.com">
<a href="https://linkedin.com/in/yourprofile">
<a href="https://github.com/yourprofile">
```

### 修改配色方案

编辑 `styles.css`，修改 CSS 变量：

```css
:root {
    --primary-color: #2563eb;      /* 主色调 */
    --secondary-color: #1e40af;    /* 辅助色 */
    --text-primary: #1f2937;       /* 主文本颜色 */
    --text-secondary: #6b7280;     /* 次要文本颜色 */
}
```

### 添加个人头像

在 `index.html` 中找到：

```html
<div class="avatar-placeholder">
    <i class="fas fa-user"></i>
</div>
```

替换为：

```html
<div class="avatar-placeholder">
    <img src="your-photo.jpg" alt="Your Name" style="width: 100%; height: 100%; object-fit: cover;">
</div>
```

将你的照片放在项目根目录，命名为 `your-photo.jpg`

## 📁 文件结构 | File Structure

```
.
├── index.html      # 主页面 HTML
├── styles.css      # 样式文件
├── script.js       # JavaScript 交互
└── README.md       # 说明文档（本文件）
```

## 🛠 技术栈 | Tech Stack

- **HTML5** - 页面结构
- **CSS3** - 样式和动画
- **JavaScript (ES6+)** - 交互功能
- **Font Awesome** - 图标库
- **GitHub Pages** - 免费托管

## 🌐 浏览器支持 | Browser Support

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)
- 移动浏览器

## 📝 许可证 | License

MIT License - 可自由使用和修改

## 🤝 贡献 | Contributing

欢迎提交 Issue 和 Pull Request！

## 📧 联系 | Contact

如有问题或建议，请通过以下方式联系：

- Email: your.email@example.com
- LinkedIn: [your-profile](https://linkedin.com/in/yourprofile)
- GitHub: [your-username](https://github.com/yourusername)

---

**Made with ❤️ by [Your Name]**
