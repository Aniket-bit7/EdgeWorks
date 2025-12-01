import { createContext, useState, useEffect, useContext } from "react";
import { api } from "./api";

export const AuthCtx = createContext();

const normalizeUser = (user) => {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    fullName: user.fullName,
    plan: user.plan || "free",
  };
};

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(() => {
    const token = window.localStorage.getItem("accessToken");
    return !!token && token !== "undefined" && token !== "null";
  });

  const [user, setUser] = useState(() => {
    const saved = window.localStorage.getItem("user");
    return saved ? normalizeUser(JSON.parse(saved)) : null;
  });

  // Run once on app load
  useEffect(() => {
    const token = window.localStorage.getItem("accessToken");
    if (token && token !== "undefined" && token !== "null") {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setIsLogged(true);
    }
  }, []);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });

    let { accessToken, user } = res.data;
    user = normalizeUser(user);

    window.localStorage.setItem("accessToken", accessToken);
    window.localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
    setIsLogged(true);

    api.defaults.headers.Authorization = `Bearer ${accessToken}`;
  };

  const signup = async (data) => {
    const res = await api.post("/auth/signup", data);

    let { accessToken, user } = res.data;
    user = normalizeUser(user);

    window.localStorage.setItem("accessToken", accessToken);
    window.localStorage.setItem("user", JSON.stringify(user));

    setUser(user);
    setIsLogged(true);

    api.defaults.headers.Authorization = `Bearer ${accessToken}`;
  };

  const logout = () => {
    window.localStorage.removeItem("accessToken");
    window.localStorage.removeItem("user");

    setUser(null);
    setIsLogged(false);

    delete api.defaults.headers.Authorization;
  };

  const upgradeToPro = async () => {
    const res = await api.post("/auth/upgrade");

    let { accessToken, user } = res.data;
    user = normalizeUser(user);

    window.localStorage.setItem("accessToken", accessToken);
    window.localStorage.setItem("user", JSON.stringify(user));

    setUser(user);

    api.defaults.headers.Authorization = `Bearer ${accessToken}`;
  };

  return (
    <AuthCtx.Provider
      value={{
        isLogged,
        setIsLogged,   
        user,
        setUser,
        login,
        signup,
        logout,
        upgradeToPro,
      }}
    >
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
