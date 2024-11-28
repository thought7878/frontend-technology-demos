"use client";

import { useState, useEffect } from "react";

function getVerticalScrollPosition() {
  if (typeof document.documentElement.scrollTop !== "undefined") {
    return document.documentElement.scrollTop;
  } else {
    return document.body.scrollTop;
  }
}
function getHorizontalScrollPosition() {
  if (typeof document.documentElement.scrollLeft !== "undefined") {
    return document.documentElement.scrollLeft;
  } else {
    return document.body.scrollLeft;
  }
}
// 获取横向、纵向滚动条位置
const getPosition = () => {
  return {
    x: getHorizontalScrollPosition(),
    y: getVerticalScrollPosition(),
    // x: document.body.scrollLeft,
    // y: document.body.scrollTop,
  };
};
const useScroll = () => {
  // 定一个 position 这个 state 保存滚动条位置
  const [position, setPosition] = useState(getPosition());
  useEffect(() => {
    const handler = () => {
      setPosition(getPosition());
    };
    // 监听 scroll 事件，更新滚动条位置
    document.addEventListener("scroll", handler);

    return () => {
      // 组件销毁时，取消事件监听
      document.removeEventListener("scroll", handler);
    };
  }, []);
  return position;
};

export default useScroll;
