module.exports = {
  lintOnSave: false,

  devServer: {
     host: "127.0.0.1",
    // host: "192.168.0.111",
    port: 799,
    open: true
  },
  assetsDir: "static",
  baseUrl: "",

  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': [
          './src/theme'
        ]
      }
    }
  },

  pluginOptions: {
    'cube-ui': {
      postCompile: true,
      theme: true
    }
  },
  chainWebpack: config => {
    /* 添加分析工具*/
    if (process.env.NODE_ENV === 'production') {
        if (process.env.npm_config_report) {
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                .end();
            config.plugins.delete('prefetch')
        }
    }
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
  },
};
