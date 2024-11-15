// "use client";

import { useRef } from "react";
import type { DependencyList } from "react";

const depsAreSame = (
  oldDeps: DependencyList,
  deps: DependencyList,
): boolean => {
  if (oldDeps === deps) return true;

  for (let i = 0; i < oldDeps.length; i++) {
    if (!Object.is(oldDeps[i], deps[i])) return false;
  }

  return true;
};

/**
 * 使用给定的函数和依赖项列表，在组件的整个生命周期中只执行一次
 *
 * @param fn 一个无参数函数，用于创建需要在组件初始化时计算的对象
 * @param deps 一个依赖项数组，当其中的值改变时，会重新执行fn
 * @returns 返回由fn函数计算得到的对象
 */
const useCreation = <T,>(fn: () => T, deps: DependencyList) => {
  // 初始化一个ref对象，用于存储依赖项、计算结果对象和初始化状态
  const { current } = useRef({
    deps,
    obj: undefined as undefined | T,
    initialized: false,
  });

  // 检查是否需要重新执行fn函数：如果未初始化或依赖项发生变化，则执行fn并更新状态
  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = fn();
    current.initialized = true;
  }

  // 返回上一次计算的结果
  return current.obj as T;
};

export default useCreation;
