module.exports = {
  devServer: {
    proxy: {
      '/cfs': {
        target: 'https://asia-northeast1-emerhub-registry.cloudfunctions.net',
        pathRewrite: { '/cfs': '/handleRegistry' },
        changeOrigin: true,
      },
    },
  },
}