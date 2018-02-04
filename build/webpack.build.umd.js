const path = require('path');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpackConfig = require('./webpack.dev.config.js');

const root = path.join(__dirname, '..', 'src');

webpackConfig.entry = {
    'log': path.join(root, './', 'log.js')
};

webpackConfig.output.filename = '[name].umd.js';
webpackConfig.output.libraryTarget = 'var';
webpackConfig.output.libraryExport = 'default';
webpackConfig.output.path = path.resolve(__dirname, '..', 'dist');

// webpackConfig.plugins.push(new UglifyJSPlugin({
//     sourceMap: false,
//     cache: true,
//     parallel: 2,
//     uglifyOptions: {
//         ie8: false,
//         compress: true,
//         warnings: false
//     },
//     // extractComments: true
// }));

module.exports = webpackConfig;
