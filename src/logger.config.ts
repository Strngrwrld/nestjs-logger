export interface LoggerConfig {
  name: string;
  level: string;
  streamType?: string;
  path?: string;
  errWithStack?: boolean;
  context?: string;
  excludeHeaders?: string[];
  reqIdHeader?: string;
  genReqId?: (r: Request) => string;
  excludeReqPath?: string;
  transformers?: Transformer[];
  avoidChildTransform?: boolean;
  shortBodyLength?: number;
}
