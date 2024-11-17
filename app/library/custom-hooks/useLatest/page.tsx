"use client";

import useLatest from "@/app/library/custom-hooks/useLatest";
import { useState, useEffect } from "react";

const Demo = () => {
  const [count, setCount] = useState(0);

  const ref = useLatest(count);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("count:", count);
      console.log("ref:", ref);
      setCount(ref.current + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  /*  
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("count:", count);
      setCount(count + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []); 
  */

  return (
    <>
      <div>自定义Hooks：useLatest</div>
      <div>count: {count}</div>
    </>
  );
};

export default Demo;
