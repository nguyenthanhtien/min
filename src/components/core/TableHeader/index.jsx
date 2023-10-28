import { memo } from "react";

import { ReactComponent as ArrowDownIcon } from "@/assets/icons/arrow-down-1.svg";

const TableHeader = ({ headers }) => {
  return (
    <thead className="mcmc-thead">
      {headers?.length ? (
        <tr className="mcmc-thead__row">
          {headers.map((header) => (
            <th
              key={header.key}
              className={`mcmc-thead__cell${
                header.className ? " " + header.className : ""
              }`}
              style={{ width: header.width || "auto" }}
            >
              <div className="mcmc-thead__cell__content">
                <p>{header.name}</p>
                {header.hasIcon ? <ArrowDownIcon /> : null}
              </div>
            </th>
          ))}
        </tr>
      ) : null}
    </thead>
  );
};

export default memo(TableHeader);
