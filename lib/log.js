'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.log = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * A JavaScript log level module for browser
 */

var levelMap = {
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
    fatal: 5,
    off: 6
};

var console = window.console || {
    log: function log() {}
};

console.fatal = console.fatal || console.error;

var config = {
    // log level
    level: 'debug',
    // log server URI
    logServerUrl: '',
    // which param server-end get the log
    logServerParam: 'msg'
};

function _log(level, msg) {
    if (levelMap[window.__log_level || config.level] <= levelMap[level]) {
        (console[level] || console.log)(msg);
        if (config.logServerUrl) {
            jsonp(config.logServerUrl, config.logServerParam, '[' + level + '] ' + msg);
        }
    }
}

var jsonpCounter = 0;

function jsonp(url, key, value) {
    var id = 'log_jsonp_' + jsonpCounter++;
    var target = document.head;
    var script = document.createElement('script');
    url += (/\?/.test(url) ? '&' : '?') + 'callback=' + encodeURIComponent(id) + '&' + encodeURIComponent(key) + '=' + encodeURIComponent(value);
    url = url.replace('?&', '?');

    var timer = setTimeout(function () {
        delete window[id];
        script.parentNode.removeChild(script);
    }, 10000);

    var fn = function fn(body) {
        window.clearTimeout(timer);
        if (false === body.success) {
            console.log('send failed');
        }
        delete window[id];
        script.parentNode.removeChild(script);
    };

    window[id] = fn;

    script.src = url;
    target.appendChild(script);
}

var Log = function () {
    function Log() {
        (0, _classCallCheck3.default)(this, Log);
    }

    (0, _createClass3.default)(Log, null, [{
        key: 'setConfig',
        value: function setConfig() {
            var conf = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            (0, _extends3.default)(config, conf);
        }
        /**
         * 级别最低，可以用于任何有利于在调试时可详细了解系统运行状态的信息
         * @param {String} msg - 日志详情
         */

    }, {
        key: 'debug',
        value: function debug(msg) {
            _log('debug', msg);
        }

        /**
         * 重要，用来反馈当前运行状态
         * @param {String} msg - 日志详情
         */

    }, {
        key: 'info',
        value: function info(msg) {
            _log('info', msg);
        }

        /**
         * 警告，可修复，系统可继续执行下去
         * @param {String} msg - 日志详情
         */

    }, {
        key: 'warn',
        value: function warn(msg) {
            _log('warn', msg);
        }

        /**
         * 错误，可修复，但无法确定系统是否能正常运行
         * @param {String} msg - 日志详情
         */

    }, {
        key: 'error',
        value: function error(msg) {
            _log('error', msg);
        }

        /**
         * 严重错误，无法修复，系统继续运行会产生严重后果
         * @param {String} msg - 日志详情
         */

    }, {
        key: 'fatal',
        value: function fatal(msg) {
            _log('fatal', msg);
        }
    }]);
    return Log;
}();

Log.d = Log.debug;
Log.i = Log.info;
Log.w = Log.warn;
Log.e = Log.error;
Log.f = Log.fatal;

exports.log = Log;