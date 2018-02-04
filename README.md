# log.level

log.level 是一个轻量级浏览器端日志分级模块。

日志分为如下几级

- debug，级别最低，可以用于任何有利于在调试时了解系统运行状态的信息
- info，重要，用来反馈当前运行状态
- warn，警告，可修复，系统可继续执行下去
- error，错误，可修复，但无法确定系统是否能正常运行
- fatal，严重错误，无法修复，系统继续运行会产生严重后果

该模块还可将日志发送到指定平台（如[browser.log.io](https://github.com/notejs/browser.log.io)）方便测试工程师和非技术人员定位问题和提供信息给技术人员。

## Usages

```bash
$ npm install log.level
```

```javascript
import { log } from 'log.level';

// 一个项目只在开始设置一次即可
log.setConfig({
    // 设置log发送到哪个日志平台，不设置将不会有发送动作
    logServerUrl: 'http://browser.log.io.server:8008/log'
});

// 调试信息
log.debug('debug');
// 系统运行信息
log.info('info');
// 警告
log.warn('warn');
// 错误
log.error('error');
// 致命错误
log.fatal('fatal');
```

如上的所有log均会在dev tool打印并发送到 browser.log.io 。

# 如何设置日志等级

```javascript
// 设置不打印debug信息
log.setConfig({
    // 此时所有debug信息不打印，会打印info、warn、error、fatal
    level: 'info'
});
// 设置值打印fatal错误和error
log.setConfig({
    // 此时所有debug信息不打印，会打印info、warn、error、fatal
    level: 'error'
});
// 关闭日志打印
log.setConfig({
    // 此时所有debug信息不打印，会打印info、warn、error、fatal
    level: 'off'
});
```

# 如何开启线上程序打印日志

建议线上关闭所有日志，但有时需要打开线上日志来调试问题。

log.level预埋了一个点来开启线上日志，只需将`window.__log_level`设置为相应的日志等级即可。如设置为info，将会打印info、warn、error、fatal日志。

# License

Copyright (c) 2018 Linus Wang Licensed under the MIT license.
