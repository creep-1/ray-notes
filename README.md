# Ray 的观察切片（ray-notes）

个人日常随笔网站：摄影、主机游戏、阅读、儿童心理学。
主线是「Ray 如何看世界：用照片、游戏、书和孩子，记录日常里的感受与观察」。

技术栈：Astro 5 + Markdown content collections + GitHub Pages。
不使用 UI 框架、动画库、评论、搜索、登录、暗色模式、CMS。

## 本地开发

在正常电脑（允许执行 node_modules 内二进制的文件系统）：

```bash
npm install
npm run dev        # http://localhost:4321/ray-notes/
npm run build && npm run preview
```

注意：Android 的 `/mnt/sdcard` 为 noexec 文件系统，无法直接运行 node_modules 中的原生二进制（如 esbuild）。在该环境开发时，请在具备执行权限的目录维护一份构建镜像来运行 npm/astro 命令，或将构建交给 GitHub Actions。

## 部署到 GitHub Pages（5 步）

1. **替换用户名（唯一必改点）**：`astro.config.mjs` 中

   ```
   site: 'https://example.github.io'   →   site: 'https://creep-1.github.io'
   ```

   sitemap、robots.txt、RSS、og:url 全部由 site + base 派生，无需改其他文件。
2. 在 GitHub 创建**公开**仓库名为 `ray-notes`。若用其他仓库名，必须同步修改 `astro.config.mjs` 的 `base: '/ray-notes'` 为 `'/<仓库名>'`。
3. 推送代码：

   ```bash
   git init
   git add .
   git commit -m "init"
   git branch -M main
   git remote add origin git@github.com:creep-1/ray-notes.git
   git push -u origin main
   ```
4. 开启 Pages：仓库 **Settings → Pages → Build and deployment → Source 选择「GitHub Actions」**。
5. 之后每次 push 到 main 自动部署（也可在 Actions 页手动触发 Deploy to GitHub Pages）。站点地址：`https://creep-1.github.io/ray-notes/`

## base 路径注意事项

- `site` 只填域名；`base` 必须与仓库名一致（本项目为 `/ray-notes`）。
- 全站链接通过 `import.meta.env.BASE_URL` 拼接，模板中不要手写 `/ray-notes/`。
- 部署前可本地 `npm run build`，检查 `dist/` 内所有资源引用均带 `/ray-notes/` 前缀。
- 自定义域名（暂未使用）：若日后绑定，改 `site` 为自定义域名并删除 `base`。

## 发布前检查清单（隐私）

- [ ] 不出现儿童真实姓名、学校、住址、正脸照片、可识别身份的日期与地点
- [ ] 儿童相关内容使用「小朋友 A」等模糊化称呼，正文注明模糊化/虚构
- [ ] 不给孩子贴标签、不做诊断、不构成专业建议
- [ ] 演示/占位内容必须 `placeholder: true`（自动显示【示例 / 占位】角标）
- [ ] 草稿必须 `draft: true`（构建自动过滤，不进列表/RSS/sitemap）
- [ ] 「通关之后」标签文章含剧透时 `spoiler: true`（详情页正文折叠 + 列表 🚧 提示）

## 图片处理规范（真实内容阶段起适用）

- 存放：文章配图放 `src/assets/`，Markdown 相对路径引用（Astro 自动优化并注入宽高）；站点级图片（favicon、og 默认图）放 `public/`。
- 格式：照片优先 WebP（备选 JPEG 质量 80 左右）；截图用 PNG。单图 ≤200KB、最长边 ≤1600px。
- 必须写 `alt` 描述与图注；图注描述场景，不写可识别身份的信息。
- 隐私红线：儿童内容一律不拍正脸（用背影/手部/局部/远景），构图避免可识别身份的元素。
- frontmatter `cover` 字段预留给列表封面/分享图，未填时使用站点默认。

## 未来可选能力（当前未接入，仅规划）

### Supabase 存图

- 定位：仅当图片数量多到不适合随仓库存储时启用；现状是图片放 `src/assets/` 随仓库走。
- 步骤：supabase.com 创建免费项目 → Storage 建公开 bucket（如 `images`）→ 从项目 Settings → API 拿到 URL 与 anon key → 复制 `.env.example` 为 `.env` 填入 → 图片上传 bucket，frontmatter `cover` 填完整 URL。
- 密钥安全：`.env` 已被 `.gitignore` 排除；anon key 本属公开密钥，但同样不要提交。

### GitHub Action 定时保活（ping）

- 用途：防止依赖的免费服务（如 Supabase 免费实例）因闲置休眠。纯静态 GitHub Pages 本身不需要保活。
- 做法：将来新增 `.github/workflows/keepalive.yml`：

  ```yaml
  name: Keepalive ping
  on:
    schedule:
      - cron: '0 3 * * *'   # 每天一次（UTC 时间）
  jobs:
    ping:
      runs-on: ubuntu-latest
      steps:
        - run: curl -fsS -o /dev/null https://<部署后填入的目标服务地址>
  ```

- 注意：cron 用 UTC 时区；GitHub 的 schedule 在高峰期可能有数分钟延迟。

## 地址速查

- RSS：`https://creep-1.github.io/ray-notes/rss.xml`
- Sitemap：`https://creep-1.github.io/ray-notes/sitemap-index.xml`
- robots.txt：`https://creep-1.github.io/ray-notes/robots.txt`
