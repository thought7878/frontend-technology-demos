import "./table.css";
import Pagination from "../pagination/table";
import { useEffect, useState } from "react";

const Table = ({ columns, data, pagination }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // 默认每页显示 10 条数据
  const [displayData, setDisplayData] = useState([]); // 用于存储当前页要展示的数据

  useEffect(() => {
    // 根据当前页和每页显示条数来更新要展示的数据
    // 计算开始索引和结束索引，然后使用slice方法获取对应的数据子数组
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setDisplayData(data.slice(startIndex, endIndex));
  }, [currentPage, itemsPerPage, data]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (e) => {
    const newPageSize = parseInt(e.target.value);
    setItemsPerPage(newPageSize);
    setCurrentPage(1); // 切换每页显示条数时，重置当前页为 1
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.field}>{column.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayData.map((rowData) => (
            <tr key={rowData.id}>
              {columns.map((column) => (
                <td key={`${rowData.id}-${column.field}`}>
                  {rowData[column.field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={data.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default Table;
