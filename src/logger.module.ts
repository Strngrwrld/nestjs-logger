import { Module } from '@nestjs/common';
import { BunyanService } from './bunyan.service';
import { WinstonService } from './winston.service';

@Module({
  imports: [],
  providers: [BunyanService, WinstonService],
  exports: [BunyanService],
})
export class LoggerModule {}
