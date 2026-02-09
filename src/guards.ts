export function assertDefined<T>(
  val: T,
  message = 'Expected value to be defined',
): asserts val is T extends undefined ? never : T {
  if (val === undefined) {
    throw new TypeError(message);
  }
}
