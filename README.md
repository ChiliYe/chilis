<!-- @format -->

# chilis

椒游门户网站

一个可部署到 Cloudflare Pages 的静态网站。

## 本地开发

```bash
npm install
npm run dev
```

## 构建部署

```bash
npm run build
```

Cloudflare Pages 配置：

- 构建命令：`npm run build`
- 输出目录：`dist`
- Node.js 版本：`22`

也可以使用 Wrangler 预览构建结果：

```bash
npm run preview:cloudflare
```
