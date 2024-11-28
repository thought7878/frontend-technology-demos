"use client";
import Pagination from "./";

const MyComponent = () => {
  const totalItems = 100; // 假设总共有100条数据
  const itemsPerPage = 10; // 每页显示10条数据

  return (
    <div>
      {/* 这里可以放置展示数据列表等相关内容 */}
      <Pagination totalItems={totalItems} itemsPerPage={itemsPerPage} />
    </div>
  );
};

export default MyComponent;
