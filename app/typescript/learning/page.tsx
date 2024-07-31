export default function Home() {}

// 函数重载
function convert(x: string): number;
function convert(x: number): string;
function convert(x: null): -1;

function convert(x: string | number | null): any {
  if (typeof x === 'string') {
    return Number(x);
  }
  if (typeof x === 'number') {
    return String(x);
  }
  return -1;
}
const x1 = convert('1'); // => number
const x2 = convert(1); // => string
const x3 = convert(null); // -1

//
// interface LanguageRankInterface {
//   [rank: number]: string; // ts(2413) 数字索引类型 string 类型不能赋值给字符串索引类型 number
//   [prop: string]: number;
// }

// interface ProgramLanguage {
//   name: string;
//   age: () => number;
// }

// /** ts(6196) 错误的继承，name 属性不兼容 */
// interface WrongTypeLanguage extends ProgramLanguage {
//   name: 'a';
//   // name: number;
// }
