 const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
    const isDev = argv.mode === 'development';

    return {
        entry: './src/index.tsx',

        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'bundle.[contenthash].js',
            publicPath: '/'
        },

        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },

        module: {
            rules: [
                // TSX/TS
                {
                    test: /\.(ts|tsx)$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },

                // CSS Modules (SCSS)
                {
                    test: /\.module\.s[ac]ss$/i,
                    use: [
                        'style-loader',
                        {
                            loader: 'css-loader',
                            options: { modules: true }
                        },
                        'sass-loader'
                    ],
                },

                // обычный SCSS
                {
                    test: /\.s[ac]ss$/i,
                    exclude: /\.module\.s[ac]ss$/i,
                    use: ['style-loader', 'css-loader', 'sass-loader'],
                },

                // обычный CSS (для swiper и других библиотек)
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'],
                },

                // изображения/шрифты
                {
                    test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf)$/,
                    type: 'asset/resource'
                }
            ],
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html'
            })
        ],

        devServer: {
            historyApiFallback: true,
            port: 3000,
            open: true,
            hot: true
        },

        devtool: isDev ? 'inline-source-map' : false
    };
};
