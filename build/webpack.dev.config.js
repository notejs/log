const path = require('path');
const root = path.join(__dirname, '..', 'src');
const examples = path.join(__dirname, '..', 'examples');

module.exports = {
    entry: {
        'log': path.join(root, './', 'log.js'),
        'index': path.join(examples, './', 'index.js')
    },
    output: {
        path: path.resolve(__dirname, '..', 'dist'),
        filename: '[name].js',
        library: 'log',
    },
    module: {
        rules: [{
            test: /\.(js)$/,
            use: [{
                loader: 'eslint-loader',
                options: {
                    formatter: require('eslint-friendly-formatter')
                },
            }],
            enforce: 'pre'
        },
        {
            test: /\.js$/,
            exclude: [
                /node_modules/
            ],
            use: [{
                loader: 'babel-loader',
            }]
        },
        {
            test: /\.html$/,
            loader: 'html-loader',
            options: {
                minimize: true,
                removeComments: true
            }
        },
        {
            test: /\.less$/,
            use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'less-loader'
                }
            ],
        }]
    },
    plugins: []
};
