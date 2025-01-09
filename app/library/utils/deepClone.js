/**
 * 判断给定的项是否为对象
 * 此函数旨在区分对象与其他类型的数据，如数组、字符串、数字等
 * 它通过检查项是否不为null、是否具有"object"类型且是否不是数组来判断
 *
 * @param {*} item - 待检查的项，可以是任何类型的值
 * @returns {boolean} - 如果项是对象则返回true，否则返回false
 */
function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

/**
 * 深度克隆一个对象或数组
 *
 * @param {Object|Array} source - 需要克隆的源对象或数组
 * @param {WeakMap} hash - 用于处理循环引用的对象映射，默认为新的 WeakMap
 * @returns {Object|Array} - 克隆后的对象或数组
 */
function deepClone(source, hash = new WeakMap()) {
  // 如果源不是对象或数组（例如基本数据类型），直接返回源
  if (!isObject(source) && !Array.isArray(source)) return source;

  // 如果源是 Date 实例，返回新的 Date 实例
  if (source instanceof Date) return new Date(source);
  // 如果源是 RegExp 实例，返回新的 RegExp 实例
  if (source instanceof RegExp) return new RegExp(source);

  // 如果源已经在哈希映射中存在，则返回映射中的对象，以处理循环引用
  if (hash.has(source)) return hash.get(source);

  // 创建新的空对象或数组，取决于源的类型
  const clone = Array.isArray(source) ? [] : {};
  // 将源对象与克隆对象添加到哈希映射中，以处理循环引用
  hash.set(source, clone);

  // 遍历源对象的每个属性
  Object.keys(source).forEach((key) => {
    // 递归调用 deepClone 克隆每个属性的值，并将其赋给克隆对象的对应属性
    clone[key] = deepClone(source[key], hash);
  });

  // 返回克隆对象
  return clone;
}
/* 
const o1 = { a: 1, b: { c: 1 } };
const o1Copy = deepClone(o1);
console.log("o1Copy:", o1Copy);
console.log("o1Copy === o1?", o1Copy === o1);

const o2 = { a: 1, b: [1, 2] };
const o2Copy = deepClone(o2);
console.log("o2Copy:", o2Copy);
console.log("o2Copy === o2?", o2Copy === o2);

const o3 = {
  a: 1,
  b: function () {
    console.log("o3");
  },
};
const o3Copy = deepClone(o3);
console.log("o3Copy:", o3Copy);
console.log("o3Copy.b():", o3Copy.b());
console.log("o3Copy === o3?", o3Copy === o3);
 */

module.exports = deepClone;
