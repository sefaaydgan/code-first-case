import React from 'react';
import styles from "./Pagination.module.scss";
import cx from "classnames";
import {MOVIES_PER_PAGE} from "../../common/constants/numberConstants.ts";
import {TPageNumber} from "../../common/constants/typeConstants.ts";


type TPaginationProps = {
  totalLength: number;
  itemPerPage?: number;
  onPageChange: (pageNumber: number) => void;
  activePage: number
}
type TPaginationItemProps = {
  page: TPageNumber; // Sayfa numarası
  handlePageClick: (pageNumber: TPageNumber) => void; // Tıklama durumunda sayfa numarasını işleyen fonksiyon
  activePage: number;
  pageCount: number;
};

const Pagination: React.FC<TPaginationProps> & {
  Item: React.FC<TPaginationItemProps>;
} = ({totalLength, itemPerPage = MOVIES_PER_PAGE, onPageChange, activePage}) => {

  const pageCount = Math.ceil(totalLength / itemPerPage);
  const pages = Array.from({length: pageCount}, (_, i) => {
    const pageIndex = i + 1;
    if (pageIndex === 1) return pageIndex;
    if (pageIndex === pageCount) return pageCount;
    if (pageIndex === activePage - 3 || pageIndex === activePage + 3) return ".";
    if (pageIndex < activePage - 3 || pageIndex > activePage + 3) return null;
    return pageIndex
  });

  const handlePageClick = (page: TPageNumber) => {
    if (page === "Prev") return onPageChange(activePage - 1)
    if (page === "Next") return onPageChange(activePage + 1)
    onPageChange(+page);
  };

  return (
    <div className={styles.pagination}>
      <Pagination.Item page={"Prev"} handlePageClick={handlePageClick} activePage={activePage} pageCount={pageCount}/>
      {pages.map((page, index) => page ? (
        <Pagination.Item key={index} page={page} handlePageClick={handlePageClick} activePage={activePage}
                         pageCount={pageCount}/>
      ) : null)}
      <Pagination.Item page={"Next"} handlePageClick={handlePageClick} activePage={activePage} pageCount={pageCount}/>
    </div>
  );
};

Pagination.Item = ({page, handlePageClick, activePage, pageCount}: TPaginationItemProps) => {
  const isDisabled = (page === "Prev" && activePage === 1) || (page === "Next" && activePage === pageCount)
  return <button
    key={page}
    onClick={() => !isDisabled && handlePageClick(page)}
    className={cx(styles.paginationButton, {
        [styles.active]: page === activePage,
        [styles.nonClickable]: page === ".",
        [styles.disabled]: isDisabled,
        [styles.notVisible]: pageCount === 0
      }
    )}
  >
    {
      page
    }
  </button>
}


export default Pagination;
