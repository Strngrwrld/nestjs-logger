interface Logger {
  contextMap: ContextMap;
  message: string;
}

interface ContextMap {
  product: Product;
  dd: Dd;
}

interface Dd {
  trace_id: string;
}

interface Product {
  params: any;
  query: any;
  body: any;
}
