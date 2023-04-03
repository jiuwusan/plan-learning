const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    console.log('HTTP 中间件')
    app.use('/apiv1/**', createProxyMiddleware({
        target: 'http://localhost:8090',
        changeOrigin: true,
        pathRewrite: { '^/apiv1': '' }
    }));
};