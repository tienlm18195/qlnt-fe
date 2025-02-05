import React from "react";
import AuthContextType from "../services/AuthContextType";
import { FIELDS } from "../constant";

let AuthContext = React.createContext<AuthContextType>(null!);
export function useAuth() {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  let signin = (userData: String, callback: VoidFunction) => {
    return () => {
      setUser(userData)
      callback()
    }
  };
  let signout = () => setUser(null);

  return <AuthContext.Provider value={{ user, signin, signout }}>
    {children}
  </AuthContext.Provider>;
}
