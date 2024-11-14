import { Input, Select, Option, Table } from "antd";
import { useQueryTable } from "./useQueryTable";

/* 模拟数据请求 */
function getTableData(payload) {
  return new Promise((resolve) => {
    Promise.resolve().then(() => {
      const { list } = listData;
      const arr = threeNumberRandom(); // 生成三个随机数 模拟数据交互
      console.log("请求参数：", payload);
      resolve({
        ...listData,
        list: [list[arr[0]], list[arr[1]], list[arr[2]]],
        total: list.length,
        current: payload.page || 1,
      });
    });
  });
}
export default function Index() {
  const [table, form] = useQueryTable({ pageSize: 3 }, getTableData);
  const { formData, setFormItem, reset } = form;
  const { pagination, tableData, getList, handerChange } = table;
  return (
    <div style={{ margin: "30px" }}>
      <div style={{ marginBottom: "24px" }}>
        <Input
          onChange={(e) => setFormItem("name", e.target.value)}
          placeholder="请输入名称"
          style={inputStyle}
          value={formData.name || ""}
        />
        <Input
          onChange={(e) => setFormItem("price", e.target.value)}
          placeholder="请输入价格"
          style={inputStyle}
          value={formData.price || ""}
        />
        <Select
          onChange={(value) => setFormItem("type", value)}
          placeholder="请选择"
          style={inputStyle}
          value={formData.type}
        >
          <Option value="1">家电</Option>
          <Option value="2">生活用品</Option>
        </Select>
        <button className="searchbtn" onClick={() => getList()}>
          提交
        </button>
        <button className="concellbtn" onClick={reset}>
          重置
        </button>
      </div>
      {useCallback(
        <Table
          columns={columns}
          dataSource={tableData.list}
          height="300px"
          onChange={(res) => {
            handerChange(res.current, res.pageSize);
          }}
          pagination={{
            ...pagination,
            total: tableData.total,
            current: tableData.current,
          }}
          rowKey="id"
        />,
        [tableData],
      )}
    </div>
  );
}
