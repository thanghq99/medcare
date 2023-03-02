import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function PrivateRoute({ children }) {
  const history = useHistory();

  useEffect(() => {
    const existingJWT = localStorage.getItem("jwtToken");

    if (!existingJWT) {
      history.push("/login");
    }
  }, [history]);

  return <>{children}</>;
}

export default PrivateRoute;
