import "./page.css";

export default function Page() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-10">
        <button className="shadowed-button">点击我</button>
        <button className="my-ring">点击我</button>
      </div>
      <div className="flex gap-3">
        1. 设置环形阴影的宽度
        <div className="ring-1 ring-red-500">Ring width 1px</div>
        <div className="r-1">自定义的Ring width 1px</div>
        <div className="ring-2 ring-red-500">Ring width 2px</div>
        <div className="ring-4 ring-red-500">Ring width 4px</div>
      </div>
      <div className="flex gap-3">
        2. 设置环形阴影的颜色
        <div className="ring-2 ring-red-500">Red ring</div>
        <div className="ring-2 ring-blue-500">Blue ring</div>
        <div className="ring-2 ring-green-500">Green ring</div>
      </div>
      <div className="flex gap-3">
        3. 设置环形阴影的模糊半径（ai的错误）
        <div className="ring-blur-2xl ring-2 ring-red-500">Ring with blur</div>
      </div>
      <div className="flex gap-3">
        4. 设置环形阴影的偏移量
        <div className="ring-2 ring-red-500 ring-offset-0">offset0</div>
        <div className="ring-2 ring-red-500 ring-offset-2">offset2</div>
        <div className="ring-2 ring-red-500 ring-offset-8">offset8</div>
      </div>
      <div className="flex gap-3">
        5. 设置环形阴影的背景颜色
        <div className="ring-2 ring-red-500 ring-offset-2 ring-offset-blue-500">
          Ring with offset color
        </div>
      </div>
      <div className="flex gap-3">
        6. 设置环形阴影的内阴影
        <div className="ring-2 ring-inset ring-red-500">Inset ring</div>
      </div>
    </div>
  );
}
