interface PromiseResolver {
  promise: Promise<T>,
  resolve: (value?: T | PromiseLike<T>) => void,
  reject: (reason?: any) => void,
}

declare interface PromiseConstructor {
  withResolvers<T>(): PromiseResolver;
}
