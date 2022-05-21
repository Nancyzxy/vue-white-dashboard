module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:8081/", //�ӿ�����
        changeOrigin: true, //�Ƿ���� �������վ����Ҫ����origin��
        ws: true, //�Ƿ���� websockets
        // secure: true, //�Ƿ�https�ӿ�
        pathRewrite: {
          //·������
          "^/api": ""
        }
      }
    }
  }
};
