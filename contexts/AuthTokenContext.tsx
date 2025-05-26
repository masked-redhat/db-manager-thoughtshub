"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback,
} from "react";

type AuthContextType = {
  authToken: string | null;
  setAuthToken: Dispatch<SetStateAction<string | null>>;
  reset: () => void;
};

const AuthTokenContext = createContext<AuthContextType | null>(null);

export function AuthTokenProvider({ children }: { children: ReactNode }) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const reset = useCallback(() => setAuthToken(null), []);

  return (
    <AuthTokenContext.Provider value={{ authToken, setAuthToken, reset }}>
      {children}
    </AuthTokenContext.Provider>
  );
}

export function useAuthToken() {
  const context = useContext(AuthTokenContext);
  if (!context) {
    throw new Error("useAuthToken must be used within AuthTokenProvider");
  }
  return context;
}
