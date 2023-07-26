import React from "react";
import AuthContextType from "../services/AuthContextType";
import { FIELDS } from "../constant";

let AuthContext = React.createContext<AuthContextType>(null!);
export function useAuth() {
  return React.useContext(AuthContext);
}

const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback: VoidFunction) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};
export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<any>(null);

  let signin = (newUser: string, callback: VoidFunction) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);

      callback();
    });
  };

  let signout = (callback: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      localStorage.setItem(FIELDS.JWT_TOKEN, "");
      localStorage.setItem(FIELDS.USER_NAME, "");
      callback();
    });
  };

  let value = { user, signin, signout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
