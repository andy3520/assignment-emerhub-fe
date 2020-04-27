module.exports = {
  // publicPath: '/wordpress54/dist',
  productionSourceMap: false,
  filenameHashing: false,
  css: { extract: false },
  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  },
  devServer: {
    proxy: {
      '/cfs': {
        target: 'https://asia-northeast1-emerhub-registry.cloudfunctions.net',
        pathRewrite: { '/cfs': '/handleRegistry' },
        // changeOrigin: true,
      }
    },
  },
}