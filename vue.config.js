module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:8081/", //接口域名
        changeOrigin: true, //是否跨域 （虚拟的站点需要更管origin）
        ws: true, //是否代理 websockets
        // secure: true, //是否https接口
        pathRewrite: {
          //路径重置
          "^/api": ""
        }
      }
    }
  }
};
