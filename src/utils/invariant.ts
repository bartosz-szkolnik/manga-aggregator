export function invariant(value: unknown, message = 'No message provided.'): asserts value {
  if (!value) {
    throw new Error(`Invariant: ${message}`);
  }
}
