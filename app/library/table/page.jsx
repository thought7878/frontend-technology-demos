"use client";
import React from "react";
import SortableTable from "./";

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
