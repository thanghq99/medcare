import { createContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    () => JSON.parse(localStorage.getItem("user")) || {}
  );

  const [accessToken, setAccessToken] = useState(
    () => localStorage.getItem("accessToken") || ""
  );

  const login = (user, token) => {
    //user object should contain id, isStaff, isAdmin for protectedRoute
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    //token is the jwt token from api
    localStorage.setItem("accessToken", token);
    setAccessToken(token);
  };

  const logout = () => {
    // localStorage.clear();
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setUser({});
    setAccessToken("");
  };

  function isLoggedIn() {
    return accessToken ? true : false;
  }

  console.log(isLoggedIn());

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        login,
        logout,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
