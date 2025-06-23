"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  Dispatch,
  SetStateAction,
  useMemo,
  FC,
} from "react";
import { APIClient as BackendAPIClient } from "@/services/BackendService";

type AuthContextType = {
  authToken: string | null;
  setAuthToken: Dispatch<SetStateAction<string | null>>;
  reset: () => void;
  client: InstanceType<typeof BackendAPIClient>;
};

const AuthTokenContext = createContext<AuthContextType | undefined>(undefined);
AuthTokenContext.displayName = "AuthTokenContext";

export const AuthTokenProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const reset = useCallback(() => setAuthToken(null), []);

  // Memoize client to only recreate when authToken changes
  const client = useMemo(() => new BackendAPIClient(authToken), [authToken]);

  return (
    <AuthTokenContext.Provider
      value={{ authToken, setAuthToken, reset, client }}
    >
      {children}
    </AuthTokenContext.Provider>
  );
};

export const useAuthToken = (): AuthContextType => {
  const context = useContext(AuthTokenContext);
  if (context === undefined) {
    throw new Error("useAuthToken must be used within an AuthTokenProvider");
  }
  return context;
};
