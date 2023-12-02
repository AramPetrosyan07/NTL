import React, { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isLogged } from "../utils/helpers";

const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const checkToken = () => {
    const token = isLogged();

    if (!token) {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  return <>{children}</>;
};

export default PrivateRoute;
