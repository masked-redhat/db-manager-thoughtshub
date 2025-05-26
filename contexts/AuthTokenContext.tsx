"use client";

import { APIClient } from "@/services/BackendService";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type AuthContextType = {
  authToken: string | null;
  setAuthToken: (token: string | null) => void;
  reset: () => void;
  client: InstanceType<typeof APIClient>;
};

const AuthTokenContext = createContext<AuthContextType | null>(null);

export function AuthTokenProvider({ children }: { children: ReactNode }) {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const reset = () => setAuthToken(null);
  const [client, setClient] = useState(new APIClient(authToken));

  useEffect(() => {
    setClient(new APIClient(authToken));

    return () => {};
  }, [authToken]);

  return (
    <AuthTokenContext.Provider
      value={{ authToken, setAuthToken, reset, client }}
    >
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
