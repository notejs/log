const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackConfig = require('./webpack.dev.config');
const port = process.env.PORT || 8080;

const app = express();

webpackConfig.devtool = 'inline-source-map';
webpackConfig.plugins = [
    new webpack.HotModuleReplacementPlugin()
];
Object.keys(webpackConfig.entry).forEach((name) => {
    webpackConfig.entry[name] = ['./build/dev-client'].concat(webpackConfig.entry[name]);
});
const compiler = webpack(webpackConfig);

const devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/dist',
    quiet: true
});

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
});

compiler.plugin('compilation', (compilation) => {
    compilation.plugin('html-webpack-plugin-after-emit', (data, cb) => {
        hotMiddleware.publish({ action: 'reload' });
        cb();
    });
});


app.use(devMiddleware);

app.use(hotMiddleware);

app.use('/examples', express.static(path.join(__dirname, '..', 'examples')));

const uri = `http://localhost:${port}/examples/index.html`;

console.log(process.env.NODE_ENV || 'development' + ' > Starting dev server...');

if (process.env.NODE_ENV === 'test') {
    devMiddleware.waitUntilValid(() => {
        console.log(`> Listening at ${uri}\n`);
    });

    module.exports = app;
} else {
    const opn = require('opn');

    devMiddleware.waitUntilValid(() => {
        console.log(`> Listening at ${uri}\n`);
        opn(uri);
    });

    app.listen(port);
}
