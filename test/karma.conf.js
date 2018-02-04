const webpackConfig = require('../build/webpack.dev.config');

module.exports = function(config) {
    config.set({
        files: ['./unit/**/*.test.js'],
        exclude: ['**/node_modules/**/*.test.js'],
        frameworks: ['jasmine', 'chai', 'sinon'],
        colors: true,
        logLevel: config.LOG_INFO,
        singleRun: true,
        autoWatch: true,
        preprocessors: {
            './unit/**/*.test.js': ['webpack'],
            '../src/**/*.js': ['coverage']
        },
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            dir: '../coverage/',
            reporters: [
                { type: 'text-summary', subdir: '.', file: 'text-summary.txt' },
                { type: 'html', subdir: 'html' },
                { type: 'cobertura', subdir: 'cobertura' }
            ],
            instrumenterOptions: {
                istanbul: { noCompact: true }
            }
        },
        webpack: {
            devtool: 'inline-source-map',
            module: webpackConfig.module
        },
        webpackServer: {
            noInfo: true
        },
        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-sinon',
            'karma-chai',
            'karma-chrome-launcher',
            'karma-sourcemap-loader',
            'karma-coverage'
        ],
        browsers: ['Chrome'],
        concurrency: Infinity
    });
};
