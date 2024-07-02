const path = require("path");

module.exports = {
  devServer: {
    headers: {
      "Cross-Origin-Embedder-Policy": "unsafe-none",
    },
  },
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src/"),
      "@app": path.resolve(__dirname, "src/app/"),
      "@components": path.resolve(__dirname, "src/components"),
      "@ui": path.resolve(__dirname, "src/components/ui/"),
      "@api_framework": path.resolve(__dirname, "src/api_framework"),
      "@/app_redux": path.resolve(__dirname, "src/app_redux"),
    },
    configure: (webpackConfig) => {
      const imageRule = webpackConfig.module.rules.find((rule) => {
        return (
          rule.oneOf &&
          rule.oneOf.some(
            (subRule) =>
              subRule.test &&
              subRule.test instanceof RegExp &&
              subRule.test.test(".svg")
          )
        );
      });

      if (imageRule) {
        const imageLoader = imageRule.oneOf.find(
          (subRule) =>
            subRule.test &&
            subRule.test instanceof RegExp &&
            subRule.test.test(".svg")
        );

        if (imageLoader) {
          if (Array.isArray(imageLoader.use)) {
            imageLoader.use.forEach((loader) => {
              if (loader.loader && loader.loader.includes("url-loader")) {
                loader.options = {
                  ...loader.options,
                  limit: 10000, // Adjust the limit as necessary
                };
              }
            });
          } else if (
            imageLoader.loader &&
            imageLoader.loader.includes("url-loader")
          ) {
            imageLoader.options = {
              ...imageLoader.options,
              limit: 10000, // Adjust the limit as necessary
            };
          }
        }
      }

      return webpackConfig;
    },
  },
};
