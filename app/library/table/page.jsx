"use client";
import SortableTable from "./";

import { useEffect, useState } from "react";
import apiClient from "../utils/apiClient";

import Table from "./new";
import useTable from "@/app/library/table/useTable";

const Page = () => {
  const { data } = useTable({
    pagination: {
      currentPage: 1,
      pageCount: 10,
    },
  });
  const columns = [
    { title: "Name", field: "name" },
    { title: "Age", field: "age" },
    // { title: "Email", field: "email" },
  ];
  console.log("data:", data);

  return (
    <div>
      <Table
        columns={columns}
        data={data}
        pagination={{
          totalItems: 80,
          onChange: (currentPage, pageSize, totalPages) => {
            console.log(currentPage, pageSize, totalPages);
          },
        }}
      />
    </div>
  );
};

export default Page;

/* 
export default function Page() {
  const columns = [
    { key: "name", label: "姓名" },
    { key: "age", label: "年龄" },
    { key: "city", label: "城市" },
  ];

  const data = [
    { name: "张三", age: 25, city: "北京" },
    { name: "李四", age: 30, city: "上海" },
    { name: "王五", age: 28, city: "广州" },
  ];

  return <SortableTable columns={columns} data={data} />;
}
 */
