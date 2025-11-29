import { createContext, useContext, useState } from "react";

export const AuthCtx = createContext();

export function AuthProvider({ children }) {
  const [isLogged, setIsLogged] = useState(() => {
    return !!localStorage.getItem("accessToken");
  });

  return (
    <AuthCtx.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </AuthCtx.Provider>
  );
}

export const useAuth = () => useContext(AuthCtx);
