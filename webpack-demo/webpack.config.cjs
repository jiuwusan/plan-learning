// 运行前需要注释，提示配置项
// import { Configuration } from 'webpack';

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { DefinePlugin, HotModuleReplacementPlugin } = require("webpack");
const BuildVersionPlugin = require("./plugin/BuildVersionPlugin");

const path = require('path');

//当前环境变量
const env = process.env.NODE_ENV

const buildPath = path.resolve(__dirname, 'dist')
/**
 * @type {Configuration}
 */
const webpackConfig = {
    // https://webpack.js.org/configuration/dev-server
    devServer: {
        hot: true,
        // contentBase: buildPath, // 静态资源
        compress: true,
        port: 9000,
        proxy: {
            '/api': {
                targrt: 'https://api.xxxx.com',
                pathRewrite: {
                    '^/api': '/api-dev' // 替换 /api 为 /api-dev
                },
                changeOrigin: true // 确保真实的主机名
            }
        }
    },
    mode: 'none', //production/development/none
    devtool: "source-map", // 方便代码调试
    entry: './src/index.js',
    output: {
        path: buildPath,
        filename: 'main.[hash].js',
        // publicPath: "public"
    },
    optimization: {
        // 模块只导出被使用的成员
        usedExports: true,
        // 压缩输出结果
        minimize: true,
        // 尽可能合并每一个模块到一个函数中
        concatenateModules: true,
        // 移除没有被使用的模块
        // sideEffects:true
    },
    splitChunks: {
        chunks: 'all' // 提供所有公共模块到单独的 bundle.js
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] // 从后向前执行
            },
            // 这是一个自定义 loader
            {
                test: /\.md$/,
                use: ['./loader/markdown-loader'] // 这里使用相对路径
            }
        ]
    },
    plugins: [
        new HotModuleReplacementPlugin(), // 代码 热重载，热更新
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Webpack Demo',
            template: './public/index.html' // 模板文件
        }),
        new CopyWebpackPlugin([{
            from: './public/*',
            context: './',
            to: buildPath, // 省略 to，自动从 output 的 path 去找
            globOptions: {
                dot: true,
                gitignore: true,
                ignore: ['**/index.html'] // **/ 表示从当前路径下忽略
            }
        }]),
        new DefinePlugin({ // 定义常量
            // 成功 code
            SUCCESS_CODE: '0'
        }),
        new BuildVersionPlugin()
    ]
};

module.exports = webpackConfig
