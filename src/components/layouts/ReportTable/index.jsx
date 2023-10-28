import { memo } from "react";

import Table from "@/components/core/Table";
import Pagination from "@/components/core/Pagination";

import useTable from "@/services/hooks/useTable";
import useReportManagement from "@/services/hooks/useReportManagement";

const ReportTable = ({ onPageClick }) => {
  const { reportHeaders } = useTable();
  const { userReportList } = useReportManagement();
  const { status, data } = userReportList;

  if (!data.totalRecords) return null;

  return (
    <div className="mcmc-report__table-content">
      <Table
        headers={reportHeaders}
        data={data.data}
        pageSize={10}
        pageNumber={data.pageNumber}
      />
      <div className="mcmc-report__pagination-content">
        <p className="mcmc-report__pagination-statistics">
          Showing <b>{data.data?.length || 0}</b> of <b>{data.totalPages}</b>{" "}
          {data.totalPages < 2 ? "page" : "pages"} for{" "}
          <b>{data.totalRecords}</b>{" "}
          {data.totalRecords < 2 ? "player" : "players"}
        </p>
        <Pagination pageCount={data.totalPages} onPageChange={onPageClick} />
      </div>
    </div>
  );
};

export default memo(ReportTable);
