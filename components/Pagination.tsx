import React from "react";
import { usePagination, DOTS } from "./usePagination";
import styles from "../styles/Pagination.module.css";
const Pagination = (props: any) => {
  const {
    onPageChange,
    totalPages,
    siblingCount = 1,
    currentPage,
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalPages,
    siblingCount,
  });

  if (!paginationRange) return null;
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={styles["pagination-container"]}>
      <li
        className={
            currentPage !== 1
              ? styles["pagination-item"]
              : styles["pagination-item disabled"]
          }
        onClick={onPrevious}
      >
        <div className={`${styles["arrow"]} ${styles["left"]}`} />
      </li>
      {paginationRange.map((pageNumber) => {
        if (pageNumber === DOTS) {
          return (
            <li
              className={`${styles["pagination-item"]} ${styles["dots"]}`}
              key={0}
            >
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={pageNumber}
            className={
              pageNumber !== currentPage
                ? styles["pagination-item"]
                : styles["pagination-item selected"]
            }
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={
            currentPage !== lastPage
              ? styles["pagination-item"]
              : styles["pagination-item disabled"]
          }
        onClick={onNext}
      >
        <div className={`${styles["arrow"]} ${styles["right"]}`} />
      </li>
    </ul>
  );
};

export default Pagination;
