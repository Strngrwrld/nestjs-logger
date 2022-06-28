import { Injectable, LoggerService } from '@nestjs/common';
import {
  createLogger,
  format,
  transports,
  Logger as WinstonLogger,
} from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import moment from 'moment';
import { Logger } from 'interface/logger.interface';

@Injectable()
export class WinstonService implements LoggerService {
  private _logger: WinstonLogger;

  _fileFormat() {
    return (log: any) => {
      const TIMESTAMP = moment().valueOf();
      const LEVEL = log.level.toUpperCase();
      const MESSAGE = log.message;
      const CONTEXT_MAP = log.contextMap;
      const LOGGER_NAME = log.loggerName;
      return JSON.stringify({
        timeMillis: TIMESTAMP,
        contextMap: CONTEXT_MAP,
        level: LEVEL,
        message: `${moment()
          .utc()
          .format('YYYYMMDDThhmmss')} ${LEVEL} ${MESSAGE}`,
        loggerName: LOGGER_NAME,
      });
    };
  }

  constructor(/* config: LoggerOptions */) {
    this._logger = createLogger({
      level: 'debug',
      format: format.json(),
      //defaultMeta: { service: 'user-service' },
      transports: [
        new DailyRotateFile({
          format: format.printf(this._fileFormat()),
          filename: './logs/erm-bff-employee-rest-error-%DATE%.log',
          datePattern: 'YYYY-MM-DD',
          level: 'error',
          maxFiles: '7d',
          json: true,
        }),
      ],
    });

    if (process.env.NODE_ENV !== 'production') {
      this._logger.add(new transports.Console());
    }
  }

  setContext(serviceName: string) {
    this._logger.defaultMeta = {
      ...this._logger.defaultMeta,
      service: serviceName,
    };
  }

  appendDefaultMeta(key: string, value: string) {
    this._logger.defaultMeta = {
      ...this._logger.defaultMeta,
      [key]: value,
    };
  }
  /**
   * Write a 'log' level log.
   */
  log(message: Logger) {
    this._logger.info(message);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: Logger) {
    this._logger.error(message);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: Logger) {
    this._logger.warn(message);
  }

  /**
   * Write a 'debug' level log.
   */
  debug?(message: Logger) {
    this._logger.debug(message);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose?(message: Logger) {
    this._logger.verbose(message);
  }
}
