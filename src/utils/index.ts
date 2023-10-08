/** Get deep mutable copy of array. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function copyToMutableArray<T extends readonly any[]>(
  constArr: T,
): Mutable<ArrayElement<T>>[] {
  return constArr.map((el) => (Array.isArray(el) ? copyToMutableArray(el) : el));
}
