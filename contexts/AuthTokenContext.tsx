"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useCallback,
  FC,
} from "react";

// Define the shape of the Auth context
type AuthContextType = {
  authToken: string | null;
  setAuthToken: Dispatch<SetStateAction<string | null>>;
  reset: () => void;
};

// Create the context with an undefined default value
const AuthTokenContext = createContext<AuthContextType | undefined>(undefined);
AuthTokenContext.displayName = "AuthTokenContext";

// Create the provider component
export const AuthTokenProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const reset = useCallback(() => setAuthToken(null), []);

  return (
    <AuthTokenContext.Provider value={{ authToken, setAuthToken, reset }}>
      {children}
    </AuthTokenContext.Provider>
  );
};

// Custom hook to use the auth token context
export const useAuthToken = (): AuthContextType => {
  const context = useContext(AuthTokenContext);
  if (context === undefined) {
    throw new Error("useAuthToken must be used within an AuthTokenProvider");
  }
  return context;
};
