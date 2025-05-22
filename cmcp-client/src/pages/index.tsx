/* eslint-disable react-hooks/exhaustive-deps */
import useStore from "@src/store";
import { PATH } from "@src/utils/path";
import { useEffect, type PropsWithChildren } from "react";
import { useNavigate } from "react-router";

const Guard: React.FC<PropsWithChildren> = ({ children }) => {
  const { isLoggedIn } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(PATH.DASHBOARD, { replace: true });
    }
  }, []);

  return (
    <>
      {children}
    </>
  );
}

export default Guard;