import React, { ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLogged } from "../utils/helpers";
// import { useTypedSelector } from "../hooks/useTypedSelector";

const PublicRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  //   const { user } = useTypedSelector((state) => state.user);
  const navigate = useNavigate();

  const getToken = () => {
    const token = isLogged();

    if (token) {
      navigate("/");
      return;
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return <>{children}</>;
};

export default PublicRoute;
