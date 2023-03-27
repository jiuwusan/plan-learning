const path = require('path');

module.exports = {
    mode: "production",
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "[name]-[hash].js",
        publicPath: "public"
    },
    module: {
        // 模块配置相关
        rules: [{
            //使用的loader
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env"]
            },
            //匹配规则
            test: /\.jsx?$/,
            //包含文件
            include: [
                path.resolve(__dirname, "src")
            ],
            //排除
            exclude: []
        }]
    }
};