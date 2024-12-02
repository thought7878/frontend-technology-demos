import React, { useState, useEffect, useRef } from "react";
import "./table.css"; // 引入对应的CSS样式文件

// 辅助函数，用于深拷贝对象数组，避免直接修改原数据
const deepCopy = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

const Table = ({ columns, data }) => {
  // 分页相关状态
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  // 排序相关状态
  const [sortColumn, setSortColumn] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // 筛选相关状态
  const [filters, setFilters] = useState({});

  // 用于保存原始的、未经过处理的数据副本
  const originalDataRef = useRef([]);

  useEffect(() => {
    // 保存原始数据
    originalDataRef.current = deepCopy(data);
    updateTotalPages();
  }, [data]);

  // 根据当前分页、排序和筛选条件计算总页数
  const updateTotalPages = () => {
    const filteredData = applyFilters(originalDataRef.current);
    const sortedData = applySort(filteredData);
    const totalItems = sortedData.length;
    setTotalPages(Math.ceil(totalItems / pageSize));
  };

  // 处理分页改变
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // 处理每页显示数量改变
  const handlePageSizeChange = (size) => {
    setPageSize(size);
    updateTotalPages();
  };

  // 处理排序改变
  const handleSort = (column) => {
    if (sortColumn === column.key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column.key);
      setSortOrder("asc");
    }
  };

  // 处理筛选条件改变
  const handleFilterChange = (column, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [column.key]: value,
    }));
    updateTotalPages();
  };

  // 应用筛选条件到数据上
  const applyFilters = (data) => {
    return data.filter((row) => {
      return Object.entries(filters).every(([key, value]) => {
        return row[key].toString().toLowerCase().includes(value.toLowerCase());
      });
    });
  };

  // 应用排序规则到数据上
  const applySort = (data) => {
    if (!sortColumn) return data;
    return [...data].sort((a, b) => {
      const valueA = a[sortColumn];
      const valueB = b[sortColumn];
      if (sortOrder === "asc") {
        return valueA > valueB ? 1 : -1;
      } else {
        return valueA < valueB ? 1 : -1;
      }
    });
  };

  // 获取当前页的数据
  const getCurrentPageData = () => {
    const filteredData = applyFilters(originalDataRef.current);
    const sortedData = applySort(filteredData);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return sortedData.slice(startIndex, endIndex);
  };

  // 判断单元格是否可编辑（这里简单示例，可根据实际需求完善判断逻辑）
  const isCellEditable = (column) => {
    return column.editable !== false;
  };

  // 处理单元格编辑保存
  const handleCellEditSave = (rowIndex, column, newValue) => {
    const updatedData = deepCopy(originalDataRef.current);
    updatedData[rowIndex][column.key] = newValue;
    setData(updatedData);
  };

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="table-header"
                onClick={() => handleSort(column)}
              >
                {column.title}
                {column.sortable && (
                  <span
                    className={`sort-icon ${sortColumn === column.key ? (sortOrder === "asc" ? "asc-icon" : "desc-icon") : ""}`}
                  >
                    {sortColumn === column.key
                      ? sortOrder === "asc"
                        ? "▲"
                        : "▼"
                      : ""}
                  </span>
                )}
                {column.filterable && (
                  <input
                    type="text"
                    placeholder="筛选"
                    value={filters[column.key] || ""}
                    onChange={(e) => handleFilterChange(column, e.target.value)}
                    className="filter-input"
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {getCurrentPageData().map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex} className="table-cell">
                  {isCellEditable(column) ? (
                    <input
                      type="text"
                      value={row[column.key]}
                      onChange={(e) =>
                        handleCellEditSave(rowIndex, column, e.target.value)
                      }
                      className="edit-input"
                    />
                  ) : (
                    row[column.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <span>每页显示: </span>
        <select
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
        </select>
        <span>
          当前页: {currentPage} / {totalPages}
        </span>
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          上一页
        </button>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          下一页
        </button>
      </div>
    </div>
  );
};

export default Table;
