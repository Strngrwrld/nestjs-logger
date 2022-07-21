import { Module } from '@nestjs/common';
import { WinstonService } from './winston.service';

@Module({
  imports: [],
  providers: [WinstonService],
  exports: [WinstonService],
})
export class LoggerModule {}
