import React, { useState, useEffect } from "react";

const SortableTableWithSearch = ({ columns, data }) => {
  // 用于存储每列的排序状态，以列的唯一标识符（key）为键，排序方向（'asc'表示升序，'desc'表示降序）为值
  const [sortConfig, setSortConfig] = useState(null);
  // 用于存储搜索输入框中的值
  const [searchTerm, setSearchTerm] = useState("");
  // 用于存储经过搜索筛选后的表格数据
  const [filteredData, setFilteredData] = useState(data);

  // 这个函数用于处理列的点击事件，以切换排序状态
  const handleSort = (column) => {
    if (sortConfig && sortConfig.key === column.key) {
      // 如果当前点击的列已经是正在排序的列，则切换排序方向
      setSortConfig((prevConfig) => ({
        key: column.key,
        direction: prevConfig.direction === "asc" ? "desc" : "asc",
      }));
    } else {
      // 如果当前点击的列不是正在排序的列，则设置为升序排序
      setSortConfig({ key: column.key, direction: "asc" });
    }
  };

  // 根据排序配置对数据进行排序的函数
  const sortedData = React.useMemo(() => {
    let sorted = [...filteredData];
    if (sortConfig) {
      sorted.sort((a, b) => {
        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];
        if (sortConfig.direction === "asc") {
          return valueA < valueB ? -1 : 1;
        } else {
          return valueA > valueB ? -1 : 1;
        }
      });
    }
    return sorted;
  }, [filteredData, sortConfig]);

  // 处理搜索输入框值变化的函数
  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    // 根据搜索词对原始数据进行过滤
    const filtered = data.filter((row) => {
      return Object.values(row).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(term);
        }
        return false;
      });
    });
    setFilteredData(filtered);
  };

  useEffect(() => {
    // 初始加载时，根据当前搜索词进行一次数据过滤
    const initialFiltered = data.filter((row) => {
      return Object.values(row).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchTerm.toLowerCase());
        }
        return false;
      });
    });
    setFilteredData(initialFiltered);
  }, [searchTerm, data]);

  return (
    <div className="w-full overflow-x-auto">
      <div className="mb-4 flex items-center justify-between">
        <input
          type="text"
          placeholder="输入搜索内容"
          className="rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring focus:ring-blue-300"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                onClick={() => handleSort(column)}
                className="cursor-pointer px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 hover:bg-gray-100"
              >
                {column.label}
                {sortConfig &&
                  sortConfig.key === column.key &&
                  (sortConfig.direction === "asc" ? (
                    <span className="ml-1 inline-block align-middle">
                      &#8593;
                    </span>
                  ) : (
                    <span className="ml-1 inline-block align-middle">
                      &#8595;
                    </span>
                  ))}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {sortedData.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td className="whitespace-nowrap px-6 py-4" key={column.key}>
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SortableTableWithSearch;
