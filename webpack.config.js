const HtmlWebpackPlugin = require('html-webpack-plugin');

const htmlPlugin = new HtmlWebpackPlugin({
    template: './src/index.html',
    filename: './index.html'
});

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            }, {
                test: /\.(png|jpg|gif|svg|woff|woff2|png|ttf|eot)$/,
                use: [
                {
                    loader: 'file-loader',
                    options: {}
                }
            ]},
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {
                test: /\.yml$/,
                loader: 'json-loader!yaml-loader',
            }
        ]
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    plugins: [htmlPlugin]
};