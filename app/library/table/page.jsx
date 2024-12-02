"use client";

import Table from ".";

const columns = [
  {
    key: "name",
    title: "姓名",
    sortable: true,
    filterable: true,
  },
  {
    key: "age",
    title: "年龄",
    sortable: true,
    filterable: true,
  },
  {
    key: "address",
    title: "地址",
    sortable: false,
    filterable: false,
  },
  {
    key: "email",
    title: "邮箱",
    sortable: true,
    filterable: true,
    editable: true, // 标记该列单元格可编辑
  },
];

const data = [
  {
    name: "张三",
    age: 25,
    address: "北京市",
    email: "zhangsan@example.com",
  },
  {
    name: "李四",
    age: 30,
    address: "上海市",
    email: "lisi@example.com",
  },
  // 更多数据...
];

function Page() {
  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default Page;
