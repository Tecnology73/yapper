declare interface Array<T> {
  at(index: number): T | undefined;
}

declare interface String {
  count(c: string, max: number = -1): number;
}
