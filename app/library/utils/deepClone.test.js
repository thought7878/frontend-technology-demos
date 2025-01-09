// 引入待测的 deepClone 函数
const deepClone = require("./deepClone");

// 测试套件
describe("deepClone", () => {
  // 辅助函数，用于判断两个对象是否相等
  function isEqual(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  // 测试基本数据类型
  test("should clone primitive values correctly", () => {
    const number = 42;
    const string = "hello";
    const boolean = true;

    expect(deepClone(number)).toBe(number);
    expect(deepClone(string)).toBe(string);
    expect(deepClone(boolean)).toBe(boolean);
  });

  // 测试数组
  test("should clone arrays correctly", () => {
    const array = [1, 2, { a: 3 }];
    const clonedArray = deepClone(array);

    expect(isEqual(array, clonedArray)).toBeTruthy();
    expect(clonedArray).not.toBe(array); // 确保是深拷贝
  });

  // 测试对象
  test("should clone objects correctly", () => {
    const obj = { a: 1, b: { c: 2 } };
    const clonedObj = deepClone(obj);

    expect(isEqual(obj, clonedObj)).toBeTruthy();
    expect(clonedObj).not.toBe(obj); // 确保是深拷贝
  });

  // 测试日期对象
  test("should clone Date objects correctly", () => {
    const date = new Date("2023-01-01T00:00:00Z");
    const clonedDate = deepClone(date);

    expect(clonedDate).toBeInstanceOf(Date);
    expect(clonedDate).toEqual(date);
  });

  // 测试正则表达式
  test("should clone RegExp objects correctly", () => {
    const regExp = /hello/gi;
    const clonedRegExp = deepClone(regExp);

    expect(clonedRegExp).toBeInstanceOf(RegExp);
    expect(clonedRegExp).toEqual(regExp);
  });

  // 测试循环引用
  test("should handle circular references", () => {
    const objA = {};
    const objB = { a: objA };
    objA.b = objB;

    const clonedObj = deepClone(objA);
    expect(clonedObj).not.toBe(objA);
    expect(clonedObj.b).not.toBe(objB);
    expect(clonedObj.b.a).toBe(clonedObj);
  });

  // 测试函数
  /* test("should clone functions correctly", () => {
    const fn = function () {
      return "hello";
    };
    const clonedFn = deepClone(fn);

    expect(clonedFn()).toBe("hello");
    expect(clonedFn).not.toBe(fn);
  }); */
  // 测试 对象中的函数
  test("should clone functions correctly", () => {
    const obj = {
      a: 1,
      b: function () {
        return "hello";
      },
    };
    const clonedObj = deepClone(obj);

    expect(clonedObj.b()).toBe("hello");
    expect(clonedObj.b).not.toBe(obj.b);
  });
});
