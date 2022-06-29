import React, { createContext, useContext, useEffect, useState } from "react";
import { StorageKeys } from "../interface/storage-keys.enum";
import authenticationService from "../services/auth.service";

interface AuthContextType {
  login(email: string, password: string): Promise<any>;
  logout(): Promise<any>;
  signed: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC = ({ children }: any) => {
  const [token, setToken] = useState("");
  const [signed, setSigned] = useState(false);

  useEffect(() => { }, []);

  async function login(email: string, password: string) {
    try {
      const result = await authenticationService.authenticate({email, password});
      setToken(result.token as unknown as string);
      localStorage.setItem(StorageKeys.JWT,result.token.accessToken);
      setSigned(!!result)
    } catch (error) {
      console.log(error);
    }
  }


async function logout() {
  setTimeout(() => {
    setSigned(false);
  }, 2000);
}

return (
  <AuthContext.Provider value={{
    login,
    logout,
    signed,
  }} >
    {children}
  </AuthContext.Provider>
);
};


export function useAuth() {
  return useContext(AuthContext);
}
