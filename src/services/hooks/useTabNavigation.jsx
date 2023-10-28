import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { tabNavigations } from "@/utils/constants/tabNavigation";
import { getRoleNames } from "@/utils/user";

import {
  activatedTabIdSelector,
  setTabIdRequest,
} from "@/slices/tabNavigation";

import useUser from "./useUser";

const useTabNavigation = () => {
  const dispatch = useDispatch();
  const { isAdmin } = useUser();

  const activatedTabId = useSelector(activatedTabIdSelector);

  const filteredTabs = useMemo(() => {
    if (isAdmin) return tabNavigations;

    return tabNavigations.filter((tab) => !tab.rules.isAdmin);
  }, [isAdmin]);

  const onSetTabId = useCallback((params) => {
    dispatch(setTabIdRequest(params));
  }, []);

  return {
    activatedTabId,
    filteredTabs,
    onSetTabId,
  };
};

export default useTabNavigation;
