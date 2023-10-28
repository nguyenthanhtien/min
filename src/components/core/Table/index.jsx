import { memo } from "react";

import TableHeader from "../TableHeader";
import TableBody from "../TableBody";

import "./styles.scss";

const Table = ({ tableClassName, headers, data, pageSize, pageNumber }) => {
  return (
    <table
      className={`mcmc-table${tableClassName ? " " + tableClassName : ""}`}
    >
      <TableHeader headers={headers} />
      <TableBody
        data={data}
        headers={headers}
        pageSize={pageSize}
        pageNumber={pageNumber}
      />
    </table>
  );
};

export default memo(Table);
