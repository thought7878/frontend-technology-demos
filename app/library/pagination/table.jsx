import React, { useState } from "react";
import "./Pagination.css";

const PAGE_SIZES = [5, 10, 20];

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onPageSizeChange,
  maxVisiblePages = 5,
  showEllipsis = true,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageSizeChange = (e) => {
    const newPageSize = parseInt(e.target.value);
    onPageSizeChange(newPageSize);
  };

  const calculateVisiblePages = () => {
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages && endPage === totalPages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return { startPage, endPage };
  };

  const { startPage, endPage } = calculateVisiblePages();

  return (
    <div className="pagination-container">
      <label htmlFor="page-size-select">Show:</label>
      <select
        id="page-size-select"
        value={itemsPerPage}
        onChange={handlePageSizeChange}
      >
        {PAGE_SIZES.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <button
        className="pagination-button prev-button"
        onClick={goToPreviousPage}
      >
        Prev
      </button>
      {showEllipsis && startPage > 1 && <span className="ellipsis">...</span>}
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <button
          key={index + startPage}
          className={`pagination-button ${currentPage === index + startPage ? "active" : ""}`}
          onClick={() => onPageChange(index + startPage)}
        >
          {index + startPage}
        </button>
      ))}
      {showEllipsis && endPage < totalPages && (
        <span className="ellipsis">...</span>
      )}
      <button className="pagination-button next-button" onClick={goToNextPage}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
