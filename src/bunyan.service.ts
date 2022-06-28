import { LoggerService } from '@nestjs/common';
import * as Bunyan from 'bunyan';
import { Logger } from './interface/logger.interface';

export class BunyanService implements LoggerService {
  private _logger: Bunyan;

  constructor() {
    const logger = Bunyan.createLogger({
      name: 'Nest App',
      level: Bunyan.DEBUG,
      streams: [
        {
          level: Bunyan.DEBUG,
          stream: process.stdout,
        },
        {
          type: 'rotating-file',
          path: './logs/api.log',
          period: '1d', // daily rotation
          count: 7, // keep 3 back copies
        },
      ],
    });

    this._logger = logger;
  }

  /**
   * Write a 'log' level log.
   */
  log(message: Logger) {
    this._logger.warn(message);
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
}
