module.exports = {
  devServer: {
    proxy: {
      '/cfs': {
        target: 'https://asia-northeast1-inc-registry.cloudfunctions.net',
        pathRewrite: { '/cfs': '' },
        changeOrigin: true,
      },
    },
  },
}