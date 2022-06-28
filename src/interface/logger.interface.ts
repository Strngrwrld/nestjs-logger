export interface Logger {
  contextMap: ContextMap;
  message: string;
}

export interface ContextMap {
  product: Product;
  dd: Dd;
}

export interface Dd {
  trace_id: string;
}

export interface Product {
  params: any;
  query: any;
  body: any;
}
