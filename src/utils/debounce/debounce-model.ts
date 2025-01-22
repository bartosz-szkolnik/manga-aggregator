export interface FunctionWithArguments {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (...args: any): any;
}

export interface DebouncedFunction<F extends FunctionWithArguments> {
  (...args: Parameters<F>): Promise<ReturnType<F>>;
  teardown: () => void;
}
