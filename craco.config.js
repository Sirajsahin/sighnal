// craco.config.js
const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@app": path.resolve(__dirname, "src/app/"),
      "@components": path.resolve(__dirname, "src/components"),
      "@ui": path.resolve(__dirname, "src/components/ui/"),
      "@api_framework": path.resolve(__dirname, "src/api_framework"),
      "@/app_redux": path.resolve(__dirname, "src/app_redux"),
    },
  },
};
