import React, { useState } from "react";
import "./Pagination.css";

const Pagination = ({
  totalItems,
  itemsPerPage,
  maxVisiblePages = 5, // 默认最多显示5个页码按钮（包含省略号等）
  showEllipsis = true, // 是否显示省略号，默认为 true
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * 计算要显示的起始页码和结束页码
   *
   * 该函数旨在为分页组件确定当前可视的页码范围，它确保在任何情况下，
   * 显示的页码范围既不会超出总页数，也不会少于最大可见页码数量
   *
   * @returns {Object} 返回一个对象，包含两个属性 `startPage` 和 `endPage`，
   *          分别表示 可视页码范围的起始页和结束页
   */
  const calculateVisiblePages = () => {
    // 计算起始页码，确保它不会小于1
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));

    // 计算结束页码，确保它不会超过总页数
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // 当浏览到接近最后一页时，调整起始页码，确保显示最大可见页码数量，始终有足够的页码可见
    // 检查当前页码范围是否小于最大可见页码数量，并且结束页码等于总页数
    if (endPage - startPage + 1 < maxVisiblePages && endPage === totalPages) {
      // 调整起始页码，以确保显示最大可见页码数量
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // 返回计算出的起始页码和结束页码
    return { startPage, endPage };
  };

  const { startPage, endPage } = calculateVisiblePages();

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination-container">
      <button
        className="pagination-button prev-button"
        onClick={goToPreviousPage}
      >
        Prev
      </button>
      {/* 折叠时，显示第一页按钮 */}
      {showEllipsis && startPage > 2 && (
        <button
          className={`pagination-button`}
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      )}
      {/* 省略号 */}
      {showEllipsis && startPage > 1 && <span className="ellipsis">...</span>}

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <button
          key={index + startPage}
          className={`pagination-button ${currentPage === index + startPage ? "active" : ""}`}
          onClick={() => handlePageChange(index + startPage)}
        >
          {index + startPage}
        </button>
      ))}

      {/* 省略号 */}
      {showEllipsis && endPage < totalPages && (
        <span className="ellipsis">...</span>
      )}
      {/* 折叠时，显示最后一页按钮 */}
      {showEllipsis && endPage < totalPages && (
        <button
          className={`pagination-button`}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      )}

      <button className="pagination-button next-button" onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
