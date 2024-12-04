function isObject(item) {
  return item && typeof item === "object" && !Array.isArray(item);
}

module.exports = function deepClone(source, hash = new WeakMap()) {
  if (!isObject(source) && !Array.isArray(source)) return source;

  // Handle Date and RegExp objects explicitly
  if (source instanceof Date) return new Date(source);
  if (source instanceof RegExp) return new RegExp(source);

  // Check for circular references
  if (hash.has(source)) return hash.get(source);

  const clone = Array.isArray(source) ? [] : {};
  hash.set(source, clone);

  Object.keys(source).forEach((key) => {
    clone[key] = deepClone(source[key], hash);
  });

  return clone;
};
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
