import useCreation from "@/app/library/custom-hooks/useCreation";
import useLatest from "@/app/library/custom-hooks/useLatest";
import useUnmount from "@/app/library/custom-hooks/useUnmount";
import debounce from "lodash/debounce";

type noop = (...args: any[]) => any;

interface DebounceOptions {
  wait?: number;
  leading?: boolean;
  trailing?: boolean;
  maxWait?: number;
}

const useDebounceFn = <T extends noop>(fn: T, options?: DebounceOptions) => {
  const fnRef = useLatest(fn);

  const debounced = useCreation(
    () =>
      debounce(
        (...args: Parameters<T>): ReturnType<T> => fnRef.current(...args),
        options?.wait ?? 1000,
        options,
      ),
    [],
  );

  useUnmount(() => {
    debounced.cancel();
  });

  return debounced;
};

export default useDebounceFn;
