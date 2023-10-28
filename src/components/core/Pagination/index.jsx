import { memo } from "react";
import ReactPaginate from "react-paginate";

import { ReactComponent as PrevIcon } from "@/assets/icons/previousPage.svg";
import { ReactComponent as NextIcon } from "@/assets/icons/nextPage.svg";

import "./style.scss";

const Pagination = ({ pageIndex, pageCount, onPageChange }) => {
  return (
    <ReactPaginate
      containerClassName="mcmc-pagination"
      pageClassName="mcmc-pagination__page"
      forcePage={pageIndex}
      pageCount={pageCount}
      previousLabel={<PrevIcon />}
      nextLabel={<NextIcon />}
      onPageChange={onPageChange}
    />
  );
};

export default memo(Pagination);
