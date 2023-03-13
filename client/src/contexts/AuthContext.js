import { createContext, useState } from "react";
import roles from "../utils/roles";

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

  const updateAccountDetails = (newAccountDetails) => {
    const newUserData = user;
    newUserData.firstName = newAccountDetails.firstName;
    newUserData.lastName = newAccountDetails.lastName;
    newUserData.fullDetails = newAccountDetails;
    localStorage.setItem("user", JSON.stringify(newUserData));
    setUser(newUserData);
  };

  function isLoggedIn() {
    return accessToken ? true : false;
  }

  console.log(isLoggedIn() ? "logged in" : "not logged in");

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        accessToken,
        setAccessToken,
        login,
        logout,
        updateAccountDetails,
        isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
