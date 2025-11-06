import { createContext } from "react";

export interface AuthData {
  id?: string;
  name?: string;
  email?: string;
  accessToken?: string;
  refreshToken?: string;
}

export interface AuthContextType {
  auth: AuthData;
  setAuth: React.Dispatch<React.SetStateAction<AuthData>>;
  persist: boolean;
  setPersist: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType>({
  auth: {},
  setAuth: () => {},
  persist: false,
  setPersist: () => {},
});

export default AuthContext;
