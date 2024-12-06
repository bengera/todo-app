const postcssPresetEnv = require("postcss-preset-env");

module.exports = {
  plugins: [
    postcssPresetEnv({
      stage: 3,
      features: {
        "logical-properties-and-values": false,
      },
    }),
  ],
};

// use stage 3 but don't touch logical properties - values