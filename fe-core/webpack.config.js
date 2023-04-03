const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: (pathData) => {
            return pathData.chunk.name === 'main' ? 'index.js' : '[name]/[name].js';
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                },
                exclude: /(node_modules|bower_components)/, // 千万别忘记添加exclude选项,不然运行可能会报错
            }
        ],
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
};


