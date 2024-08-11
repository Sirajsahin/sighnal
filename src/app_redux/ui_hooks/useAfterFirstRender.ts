import { useEffect, useState } from "react";

export const useAfterFirstRender = (callback: () => any, deps: Array<any>) => {
  const [isFirstRender, setIsFirstRender] = useState<boolean>(true);
  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
      return;
    }
    callback();
  }, [...deps]);
};
