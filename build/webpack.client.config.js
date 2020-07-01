const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
        hot: true,
        inline: true,
        compress: true,
        contentBase: path.join(__dirname, '../dist/client'),
        proxy: {
            '/api/**': {
                target: 'http://localhost:8081',
                secure: false
            }
        },
        port: 8080,
        watchOptions: {
            ignored: [
                /node_modules/
            ],
            poll: true
        }
    },
    entry: [
        path.resolve(__dirname, '../src/client/index.tsx')
    ],
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, '../dist/client')
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.html$/,
                use: [
                    'html-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            templateContent: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="utf-8">
                    <title>Daily Harvest</title>
                    <link href="https://www.daily-harvest.com/static/fav/favicon-32x32.png"
                          rel="icon"
                          type="image/x-icon"/>
                </head>
                <body>
                    <main id="root"></main>
                </body>
                </html>
            `,
            filename: 'index.html'
        })
    ],
    resolve: {
        modules: [
            path.resolve(__dirname, '../node_modules'),
            'node_modules'
        ],
        extensions: [
            '.html',
            '.json',
            '.js',
            '.jsx',
            '.ts',
            '.tsx'
        ]
    }
};
