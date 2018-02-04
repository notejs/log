const path = require('path');

const webpackConfig = require('./webpack.dev.config.js');

const root = path.join(__dirname, '..', 'src');

webpackConfig.entry = {
    'log': path.join(root, './', 'log.js')
};

webpackConfig.output.libraryTarget = 'commonjs2';

module.exports = webpackConfig;
