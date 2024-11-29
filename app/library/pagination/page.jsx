"use client";
import Pagination from "./";

const MyComponent = () => {
  const totalItems = 100; // 假设总共有100条数据
  const itemsPerPage = 10; // 每页显示10条数据
  const maxVisiblePages = 5; // 这里设置最多显示5个页码相关元素（包含省略号等）
  const showEllipsis = true; // 显示省略号

  return (
    <div>
      {/* 这里可以放置展示数据列表等相关内容 */}
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        maxVisiblePages={maxVisiblePages}
        showEllipsis={showEllipsis}
      />
    </div>
  );
};

export default MyComponent;
