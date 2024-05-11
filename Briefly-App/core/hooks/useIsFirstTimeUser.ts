import { useEffect, useState } from "react";
import { isFirstTimeUser, setNotFirstTimeUser, removeFirstTimeUser } from "../persistent/isFirstTimeUser";
export const useIsFirstTimeUser = () => {
  const [isFirstTime, setIsFirstTime] = useState(true);
  useEffect(() => {
    isFirstTimeUser().then((res) => {
      if (res) {
        setIsFirstTime(true);
        setNotFirstTimeUser();
      } else {
        setIsFirstTime(false);
      }
    });
  }, []);
  return [isFirstTime, setIsFirstTime];
};
