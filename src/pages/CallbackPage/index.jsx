import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMsal } from "@azure/msal-react";

import { getCurrentURL } from "@/services/storage";

const CallbackPage = () => {
  const navigate = useNavigate();
  const { instance } = useMsal();

  const activeAccount = instance.getActiveAccount();

  useEffect(() => {
    if (activeAccount) {
      navigate(getCurrentURL() || "/");
    } else {
      navigate("/main");
    }
  }, [activeAccount]);

  return <></>;
};

export default CallbackPage;
