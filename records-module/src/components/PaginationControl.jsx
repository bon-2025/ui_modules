import React from "react";
import { Button } from "react-bootstrap";

/**
 * @param {number} currentPage
 * @param {number} totalPages
 * @param {function} onPageChange
 */
export const PaginationControl = ({ currentPage, totalPages, onPageChange }) => (
  <div className="d-flex justify-content-between align-items-center mt-3">
    <div>Page {currentPage} of {totalPages}</div>
    <div>
      <Button size="sm" className="me-2" disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>Prev</Button>
      <Button size="sm" disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>Next</Button>
    </div>
  </div>
);
