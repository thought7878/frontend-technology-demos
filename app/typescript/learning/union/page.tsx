export default function Home() {}

// 接口的联合类型
interface Bird {
  fly(): void;
  layEggs(): void;
}
interface Fish {
  swim(): void;
  layEggs(): void;
}
const getPet: () => Bird | Fish = () => {
  return {
    // ...
  } as Bird | Fish;
};
const Pet = getPet();
Pet.layEggs(); // ok
/* Pet.fly(); // ts(2339) 'Fish' 没有 'fly' 属性; 'Bird | Fish' 没有 'fly' 属性

if (typeof Pet.fly === 'function') {
  // ts(2339)

  Pet.fly(); // ts(2339)
} */
if ('fly' in Pet) {
  Pet.fly(); // ok
}

// 交叉类型

{
  type Useless = string & number;
}
// 接口的交叉 / 合并
type IntersectionType = { id: number; name: string } & { age: number };
const mixed: IntersectionType = {
  id: 1,
  name: 'name',
  age: 18,
};

//同名属性的类型不兼容

type IntersectionTypeConfict = { id: number; name: string } & {
  age: number;
  name: number;
};
// const mixedConflict: IntersectionTypeConfict = {
//   id: 1,
//   name: 2, // ts(2322) 错误，'number' 类型不能赋给 'never' 类型
//   age: 2,
// };

// 同名属性的类型兼容
{
  type IntersectionTypeConfict = { id: number; name: 2 } & {
    age: number;
    name: number;
  };
  let mixedConflict: IntersectionTypeConfict = {
    id: 1,
    name: 2, // ok
    age: 2,
  };
  // mixedConflict = {
  //   id: 1,
  //   name: 22, // '22' 类型不能赋给 '2' 类型
  //   age: 2,
  // };
}
{
  type UnionIntersectionA =
    | ({ id: number } & { name: string })
    | ({ id: string } & { name: number }); // 交叉操作符优先级高于联合操作符
  type UnionIntersectionB =
    | ('px' | 'em' | 'rem' | '%')
    | ('vh' | 'em' | 'rem' | 'pt'); // 调整优先级
}

{
  type URStr = 'string' | string; // 类型是 string
  type URNum = 2 | number; // 类型是 number
  type URBoolen = true | boolean; // 类型是 boolean
  enum EnumUR {
    ONE,
    TWO,
  }
  type URE = EnumUR.ONE | EnumUR; // 类型是 EnumUR
}
