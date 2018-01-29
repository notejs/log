import {jsonp} from './jsonp';

const levelMap = {
    debug: 1,
    info: 2,
    warn: 3,
    error: 4,
    fatal: 5,
    off: 6
};

const console = window.console || { log() { } };

console.fatal = console.fatal || console.error;

const config = {
    // 日志级别
    level: 'debug',
    // 日志服务器url
    logServerUrl: 'http://localhost:8008/log',
    logServerParam:  ''
};

function log(level, msg) {
    if ( (levelMap[window.__log_level || config.level]) <= levelMap[level]) {
        (console[level] || console.log)(msg);
        if (config.logServerUrl) {
            jsonp(config.logServerUrl, {
                [config.logServerParam || 'msg']: msg
            });
        }
    }
}

const logger = {
    setConfig(conf = {}) {
        Object.assign(config, conf);
    },
    /**
     * 级别最低，可以用于任何有利于在调试时可详细了解系统运行状态的信息
     * @param {String} msg - 日志详情
     */
    debug(msg) {
        log('debug', msg);
    },

    /**
     * 重要，用来反馈当前运行状态
     * @param {String} msg - 日志详情
     */
    info(msg) {
        log('info', msg);
    },

    /**
     * 警告，可修复，系统可继续执行下去
     * @param {String} msg - 日志详情
     */
    warn(msg) {
        log('warn', msg);
    },

    /**
     * 错误，可修复，但无法确定系统是否能正常运行
     * @param {String} msg - 日志详情
     */
    error(msg) {
        log('error', msg);
    },

    /**
     * 严重错误，无法修复，系统继续运行会产生严重后果
     * @param {String} msg - 日志详情
     */
    fatal(msg) {
        log('fatal', msg);
    }
};

logger.d = logger.debug;
logger.i = logger.info;
logger.w = logger.warn;
logger.e = logger.error;
logger.f = logger.fatal;

export { logger as log};
