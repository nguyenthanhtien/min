import { memo } from "react";

import SearchDropdown from "@/components/core/SearchDropdown";

import "./styles.scss";

const ReportByDropdown = ({ dropdownID, title, data, isMultiSearch }) => {
  return (
    <div className="mcmc-report__search-by">
      <p className="mcmc-report__search-by__title">{title}</p>
      <div className="mcmc-report__search-by__dropdown">
        <SearchDropdown
          id={dropdownID}
          isMultiSearch={isMultiSearch}
          searchPlaceholder={`Search ${title?.split(" ")[1]}`}
          data={data}
        />
      </div>
    </div>
  );
};

export default memo(ReportByDropdown);
