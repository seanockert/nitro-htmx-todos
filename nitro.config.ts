//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: 'src',
  compressPublicAssets: { gzip: true, brotli: false },
  preset: 'cloudflare-pages',
  experimental: {
    database: true
  },
  publicAssets: [
    {
      baseURL: 'images',
      dir: 'public/images',
      maxAge: 60 * 60 * 24 * 1 // 1 day
    }
  ]
});
