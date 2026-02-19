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
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/i,
                    use: ['style-loader', 'css-loader'], // сначала css-loader, потом style-loader
                }
            ]
        },

        plugins: [
            new HtmlWebpackPlugin({
                template: './public/index.html'
            })
        ],

        devServer: {
            historyApiFallback: true,
            port: 3000,
            open: true
        },

        devtool: isDev ? 'inline-source-map' : false
    };
};
