const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
    const isDev = argv.mode === 'development';

    return {
        entry: './src/index.tsx',

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: isDev
                ? 'bundle.js'
                : 'bundle.[contenthash].js',
            publicPath: '/',
            clean: true
        },

        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },

        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },

                {
                    test: /\.module\.s[ac]ss$/i,
                    use: [
                        isDev
                            ? 'style-loader'
                            : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: { modules: true }
                        },
                        'sass-loader'
                    ],
                },

                {
                    test: /\.s[ac]ss$/i,
                    exclude: /\.module\.s[ac]ss$/i,
                    use: [
                        isDev
                            ? 'style-loader'
                            : MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader'
                    ],
                },

                {
                    test: /\.css$/i,
                    use: [
                        isDev
                            ? 'style-loader'
                            : MiniCssExtractPlugin.loader,
                        'css-loader'
                    ],
                },

                {
                    test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf)$/,
                    type: 'asset/resource'
                }
            ],
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html'
            }),

            !isDev &&
            new MiniCssExtractPlugin({
                filename: 'styles.[contenthash].css'
            })
        ].filter(Boolean),

        devServer: {
            historyApiFallback: true,
            port: 3000,
            open: true,
            hot: true
        },

        devtool: isDev ? 'inline-source-map' : false
    };
};