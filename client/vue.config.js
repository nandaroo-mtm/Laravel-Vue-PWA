const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "PWA Client",
    themeColor: "#ffd100",
  },
});
