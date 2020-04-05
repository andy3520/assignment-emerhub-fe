module.exports = {
  devServer: {
    proxy: {
      '/cfs': {
        target: 'https://asia-northeast1-emerhub-registry.cloudfunctions.net',
        pathRewrite: { '/cfs': '/handleRegistry' },
        changeOrigin: true,
      },
      '/stripe': {
        target: 'http://localhost:5001',
        pathRewrite: { '/stripe': '/test-stripe-andy/us-central1/payments' },
        changeOrigin: true,
      },
    },
  },
}