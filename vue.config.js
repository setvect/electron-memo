module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 8080,
  },
  configureWebpack: {
    devtool: "source-map",
  },
  pages: {
    index: {
      entry: "src/renderer/main.ts",
    },
  },
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: "./src/main/background.ts",
      nodeIntegration: true,
    },
  },
};