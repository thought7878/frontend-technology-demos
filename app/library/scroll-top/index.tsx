import useScroll from "@/app/library/custom-hooks/useScroll";
import { useCallback } from "react";

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
