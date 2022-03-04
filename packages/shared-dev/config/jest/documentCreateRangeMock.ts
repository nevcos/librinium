/**
 * `createRange` is not available on jsdom
 * https://github.com/jsdom/jsdom/issues/3002
 */
// @ts-ignore
document.createRange = () => {
  const range = new Range();

  range.getBoundingClientRect = jest.fn();

  range.getClientRects = () => {
    return {
      item: () => null,
      length: 0,
      [Symbol.iterator]: jest.fn()
    };
  };

  return range;
}
