/* eslint-disable react-hooks/exhaustive-deps */
import useStore from "@src/store"
import { useNavigate } from "react-router";
import React, { memo, useEffect } from "react"

const Protected: React.FC<React.PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();

  const { isLoggedIn } = useStore();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/", { replace: true });
    }
  }, []);

  return (
    <div>
      {children}
    </div>
  )
}

export default memo(Protected);