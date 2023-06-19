const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "workbox",
    themeColor: "#fff3e0",
    msTileColor: "#fff3e0",
    appleMobileWbeAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#fff3e0",
  }
});
