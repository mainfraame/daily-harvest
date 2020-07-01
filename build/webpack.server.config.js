const path = require('path');
const nodeExternals = require('webpack-node-externals');

const WebpackExpressPlugin = require('./webpack.server.plugin');

module.exports = {
    devtool: 'source-map',
    target: 'node',
    externals: [nodeExternals()],
    entry: [
        path.resolve(__dirname, '../src/server/index.ts')
    ],
    output: {
        path: path.resolve(__dirname, '../dist/server'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.(ts)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    plugins: process.env.NODE_ENV === 'production' ? [] : [
        new WebpackExpressPlugin({
            entry: path.resolve(__dirname, '../dist/server/index.js')
        })
    ],
    resolve: {
        modules: [
            path.resolve(__dirname, '../node_modules'),
            'node_modules'
        ],
        extensions: [
            '.js',
            '.json',
            '.ts'
        ]
    }
};
