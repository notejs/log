
// eslint-disable-next-line
import { log } from '../src/log';

log.setConfig({
    logServerUrl: 'http://127.0.0.1:8008/log'
});

log.info('info');

log.debug('debug');

log.warn('warn');

log.error('error');

log.fatal('fatal');
