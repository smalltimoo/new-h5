module.exports = {
  lintOnSave: false,

  devServer: {
     host: "127.0.0.1",
    //host: "192.168.0.111",
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
  }
};
