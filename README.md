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
- 不要配置 `wrangler deploy` 作为部署命令；这是 Workers 命令，不适用于本项目。

也可以使用 Wrangler 预览构建结果：

```bash
npm run preview:cloudflare
```

## 使用 Wrangler 手动部署

```bash
npm run deploy:cloudflare
```

首次部署前先登录：

```bash
npx wrangler login
```
