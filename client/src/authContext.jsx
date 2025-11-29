import { createContext, useState, useEffect, useContext } from "react";
import { api } from "./api";

export const AuthCtx = createContext();

const normalizeUser = (user) => ({
  ...user,
  fullName: `${user.firstName} ${user.lastName}`,
  plan: user.plan || "free", 
});

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(() => {
    return !!localStorage.getItem("accessToken");
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? normalizeUser(JSON.parse(saved)) : null;
  });

  // Attach token to Axios on page load
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);


  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    let { accessToken, user } = res.data;

    user = normalizeUser(user);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));

    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    setUser(user);
    setIsLogged(true);
  };


  const signup = async (data) => {
    const res = await api.post("/auth/signup", data);
    let { accessToken, user } = res.data;

    user = normalizeUser(user);

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));

    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    setUser(user);
    setIsLogged(true);
  };


  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    delete api.defaults.headers.common["Authorization"];

    setUser(null);
    setIsLogged(false);
  };


  const upgradeToPro = async () => {
    const res = await api.post("/auth/upgrade");
    let { accessToken, user } = res.data;

    user = normalizeUser(user);   // ensures plan = "pro"

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("user", JSON.stringify(user));

    api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    setUser(user);
  };

  return (
    <AuthCtx.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
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
