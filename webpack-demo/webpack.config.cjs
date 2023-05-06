// 运行前需要注释，提示配置项
// import { Configuration } from 'webpack';

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const path = require('path');

//当前环境变量
const env = process.env.NODE_ENV

const buildPath = path.resolve(__dirname, 'dist')
/**
 * @type {Configuration}
 */
const webpackConfig = {
    mode: "none", //production/development/none
    entry: './src/index.js',
    output: {
        path: buildPath,
        filename: "main.[hash].js",
        publicPath: "public"
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
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'Webpack Demo',
            template: './public/index.html' // 模板文件
        }),
        new CopyWebpackPlugin([{
            from: "./public/*",
            to: buildPath,
            globOptions: {
                dot: true,
                gitignore: true,
                ignore: ["index.html"],
            }
        }])
    ]
};

module.exports = webpackConfig