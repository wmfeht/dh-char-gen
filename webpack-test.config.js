const nodeExternals = require('webpack-node-externals');
const ShellPlugin = require('webpack-shell-plugin');

module.exports = {
    node: {
        fs: 'empty'
    },
    entry: './test/index.js',
    output: {
        filename: 'testBundle.js'
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }, {
                test: /\.(png|jpg|gif|svg|woff|woff2|png|ttf|eot)$/,
                use: [{
                    loader: 'file-loader',
                    options: {}
                }]
            },
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {
                test: /\.yml$/,
                loader: 'json-loader!yaml-loader',
            }
        ]
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './dist'
    },
    plugins: [new ShellPlugin({
        onBuildExit: 'mocha --require source-map-support/register dist/testBundle.js'
    })]
};