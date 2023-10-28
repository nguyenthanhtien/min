import { useCallback } from "react";

const useToast = () => {
  const setToast = useCallback(
    ({ toastId, toastTitle, toastMessage, toastTimer, toastTemplate }) => {
      const root = document.getElementById("root");
      const toastEle =
        toastTemplate ||
        `<div class="mcmc-toast" id="${toastId}"><div><p class="mcmc-toast__title">${toastTitle}</p><p class="mcmc-toast__message">${toastMessage}</p></div></div>`;

      root.insertAdjacentHTML("beforeend", toastEle);
      setTimeout(() => {
        const toastEle = document.getElementById(toastId);
        toastEle.remove();
      }, toastTimer);
    },
    []
  );

  return {
    setToast,
  };
};

export default useToast;
