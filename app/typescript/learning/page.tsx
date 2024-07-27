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
