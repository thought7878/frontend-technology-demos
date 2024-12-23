"use client";

import React, { useCallback } from "react";
import useScroll from "./";

function getViewportHeight() {
  if (typeof window.innerHeight === "number") {
    return window.innerHeight;
  } else if (
    document.documentElement &&
    typeof document.documentElement.clientHeight === "number"
  ) {
    return document.documentElement.clientHeight;
  } else {
    return document.body.clientHeight;
  }
}

function ScrollTop() {
  const { y } = useScroll();

  const goTop = useCallback(() => {
    document.body.scrollTop = 0;
  }, []);

  console.log("y:", y);
  const viewportHeight = getViewportHeight();
  console.log("当前视口高度为:", viewportHeight);

  // 当滚动条位置纵向超过 视口高度 时，显示返回顶部按钮
  if (y > viewportHeight) {
    return (
      <button onClick={goTop} className="fixed bottom-3 right-3">
        Back to Top
      </button>
    );
  }
  // 否则不 render 任何 UI
  return null;
}

export default function Page() {
  return (
    <div className="h-[4000px]">
      <div className="flex h-screen flex-col justify-between">
        <h1>Scroll to see the button appear</h1>
        <h1>Scroll to see the button appear</h1>
      </div>
      <ScrollTop />
    </div>
  );
}
