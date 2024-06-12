//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: 'src',
  compressPublicAssets: { gzip: true, brotli: false },
  preset: 'cloudflare-pages',
  experimental: {
    database: true
  },
  devServer: {
    watch: ['src/routes', 'src/components'],
  },
  publicAssets: [
    {
      baseURL: 'images',
      dir: 'public/images',
      maxAge: 60 * 60 * 24 * 1 // 1 day
    }
  ]
});
