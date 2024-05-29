//https://nitro.unjs.io/config
export default defineNitroConfig({
  srcDir: 'src',
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
