const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/IPFS_API',
    createProxyMiddleware({
      target: 'http://109.235.70.27:5001',
      pathRewrite: { '^/IPFS_API': '' },
      changeOrigin: true,
    })
  );
  app.use(
    '/TF_API',
    createProxyMiddleware({
      target: 'http://109.235.70.27:8501',
      pathRewrite: { '^/TF_API': '' },
      changeOrigin: true,
    })
  );
};
