import React, { useCallback } from "react";
import useScroll from "./";
function ScrollTop() {
  const { y } = useScroll();

  const goTop = useCallback(() => {
    document.body.scrollTop = 0;
  }, []);

  // 当滚动条位置纵向超过 300 时，显示返回顶部按钮
  if (y > 300) {
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
    <div className="h-[2000px]">
      <ScrollTop />
    </div>
  );
}
