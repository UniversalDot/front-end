// const webpack = require("webpack")

// module.exports = function override(config, env) {
//     //do stuff with the webpack config...
//     config.resolve.fallback = {
//         ...config.resolve.fallback,
//         stream: require.resolve("stream-browserify"),
//         buffer: require.resolve("buffer"),
//     }
//     config.resolve.extensions = [...config.resolve.extensions, ".ts", ".js"]
//     config.plugins = [
//         ...config.plugins,
//         new webpack.ProvidePlugin({
//             process: "process/browser",
//             Buffer: ["buffer", "Buffer"],
//         }),
//     ]
//     return config
// }

// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

// module.exports = function override(config, env) {
//   config.resolve = {
//     fallback: {
//       stream: require.resolve('stream-browserify'),
//     },
//     // NOTE: I added this; missing in Substrate template and causes missing module errors;
//     extensions: [...config.resolve.extensions, '.ts', '.js'],
//   };

//   config.plugins.push(new NodePolyfillPlugin());
//   return config;
// };

// Leave commented out configs above for a certain period as an archive of what we tried earlier that didn't work in build mode;
// node-polyfill-webpack-plugin - this depency is installed because it contains process, buffer, util and other sub-dependencies, so we don't add them as deps separately;

const webpack = require('webpack');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    process: require.resolve('process/browser'),
    zlib: require.resolve('browserify-zlib'),
    stream: require.resolve('stream-browserify'),
    util: require.resolve('util'),
    buffer: require.resolve('buffer'),
    asset: require.resolve('assert'),
    console: require.resolve('console-browserify'),
  };

  // Option 1 that works - use either one;
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser.js',
      Buffer: ['buffer', 'Buffer'],
    })
  );

  // Option 2 that works - use either one;
  // config.plugins.push(new NodePolyfillPlugin());

  return config;
};
