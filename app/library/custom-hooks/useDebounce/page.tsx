"use client";
import React, { useState } from "react";
import { Button } from "antd";
import useDebounceFn from "./";

const Index: React.FC<any> = () => {
  const [number, setNumber] = useState<number>(0);

  const run = useDebounceFn(() => setNumber((v) => v + 1), { wait: 500 });

  return (
    <>
      <div>数字： {number}</div>
      <div>快速点击按钮，但只会在所有点击完成的500ms执行函数</div>
      <Button type="primary" onClick={run}>
        点击 + 1
      </Button>
    </>
  );
};

export default Index;
