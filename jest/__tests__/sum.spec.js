const { add, sum } = require('../sum');

test('add', () => {
  expect(sum(1, 1)).toBe(2);
  expect(add(1, 1)).toBe(2);
});