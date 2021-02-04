const { test1, fetchUserInfo, forEach, timeGame } = require("./index");

const val = { object: {} };
val.circularReference = val;
val[Symbol("foo")] = "foo";
val.map = new Map([["prop", "value"]]);
val.array = [-0, Infinity, NaN];

beforeAll(() => {});

test("test function return test1", () => {
  expect(test1()).toBe("test1");
  expect(1 + 1).not.toBe(0);
  expect({ name: "jmz" }).toEqual({ name: "jmz" });
  expect(null).toBeNull();
  expect(undefined).toBeUndefined();
  expect(0).toBeFalsy();
});

test("test Number vali", () => {
  expect(10).toBeGreaterThan(3);
  expect(10).toBeGreaterThanOrEqual(10);
  expect(0.1 + 0.2).toBeCloseTo(0.3);
  expect([1, 2, 3]).toContain(1);
  expect(new Set([2, 4, 5])).toContain(2);
});

test("test fetch userinfo", () => {
  fetchUserInfo().then((data) => {
    expect(data).toHaveProperty("name");
  });
});

test('test async await', async () => {
  const userinfo = await fetchUserInfo();
  expect(userinfo).toEqual({ name: 'jmz' });
});

test("test mock function ", () => {
  const mockCallback = jest.fn((x) => x + 2);
  forEach([1, 2], mockCallback);
  expect(mockCallback.mock.calls.length).toBe(2);
  expect(mockCallback.mock.results.length).toBe(2);
  expect(mockCallback.mock.results[0].value).toBe(3);

  const myMock = jest.fn();
  const m1 = new myMock();
  const bound = myMock.bind({});
  bound();
  console.log(myMock.mock.instances);
});

jest.useFakeTimers();

test("test timer", () => {
  timeGame();
  expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
});
