import { memo, useState, useCallback } from "react";

import Table from "@/components/core/Table";
import SearchInput from "@/components/core/SearchInput";
import Pagination from "@/components/core/Pagination";
import ModalUserDetail from "../ModalUserDetail";

import useUserManagement from "@/services/hooks/useUserManagement";
import useTable from "@/services/hooks/useTable";

import "./styles.scss";

const defaultPageParams = {
  pageNumber: 0,
  pageSize: 8,
};

const AllUser = () => {
  const [pageNumber, setPageNumber] = useState(0);
  const [searchString, setsearchString] = useState("");

  const { userList, onGetUserList } = useUserManagement();
  const { allUserHeaders } = useTable();

  const handleSubmitSearch = useCallback((text) => {
    onGetUserList({
      pageNumber: 0,
      pageSize: defaultPageParams.pageSize,
      keyword: text,
    });
    setPageNumber(0);
    setsearchString(text);
  }, []);

  const handePageClick = useCallback(
    (page) => {
      onGetUserList({
        pageNumber: page.selected,
        pageSize: defaultPageParams.pageSize,
        keyword: searchString,
      });
      setPageNumber(page.selected);
    },
    [searchString]
  );

  return (
    <div className="mcmc-all-user">
      {userList.data.data?.length ? (
        <Table
          headers={allUserHeaders}
          data={userList.data.data}
          pageSize={8}
          pageNumber={userList.data.pageNumber}
        />
      ) : null}
      <div className="mcmc-all-user__bottom">
        <SearchInput
          placeHolder="Search Name, Email or Role"
          value={searchString}
          onSubmit={handleSubmitSearch}
        />
        {userList.data.data?.length ? (
          <Pagination
            pageIndex={pageNumber}
            pageCount={userList.data.totalPages}
            onPageChange={handePageClick}
          />
        ) : null}
      </div>
      <ModalUserDetail pageNumber={pageNumber} searchString={searchString} />
    </div>
  );
};

export default memo(AllUser);
