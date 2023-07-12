import React, { useState, useEffect } from 'react';
import './Pagination.css';

const Pagination = ({ totalPages, onPageChange }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [visiblePages, setVisiblePages] = useState([]);

  useEffect(() => {
    updateVisiblePages(currentPage);
  }, [currentPage, totalPages]);

  const updateVisiblePages = (currentPage) => {
    let startPage, endPage;

    if (totalPages <= 10) {
      startPage = 1;
      endPage = totalPages;
    } else {
      if (currentPage <= 8) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    const visiblePageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      visiblePageNumbers.push(i);
    }

    setVisiblePages(visiblePageNumbers);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onPageChange(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      onPageChange(currentPage + 1);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    return visiblePages.map((pageNumber) => (
      <span
        key={pageNumber}
        className={`number ${currentPage === pageNumber ? 'active' : ''}`}
        onClick={() => goToPage(pageNumber)}
      >
        {pageNumber}
      </span>
    ));
  };

  return (
    <div className="pagination">
      <span className={`arrow ${currentPage === 1 ? 'disabled' : ''}`} onClick={goToPreviousPage}>
        ←
      </span>
      {renderPageNumbers()}
      <span className={`arrow ${currentPage === totalPages ? 'disabled' : ''}`} onClick={goToNextPage}>
        →
      </span>
    </div>
  );
};

export default Pagination;
