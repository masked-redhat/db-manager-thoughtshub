"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  FC,
} from "react";

// Define the shape of your transfer data
type TransferData = unknown; // You can replace `unknown` with a more specific type if needed

type TransferContextType = {
  data: TransferData;
  setData: Dispatch<SetStateAction<TransferData>>;
};

// Create the context with undefined default (preferred over null)
const TransferContext = createContext<TransferContextType | undefined>(
  undefined
);
TransferContext.displayName = "TransferContext";

// Provider component
export const TransferProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<TransferData>(null);

  return (
    <TransferContext.Provider value={{ data, setData }}>
      {children}
    </TransferContext.Provider>
  );
};

// Custom hook
export const useTransfer = (): TransferContextType => {
  const context = useContext(TransferContext);
  if (context === undefined) {
    throw new Error("useTransfer must be used within a TransferProvider");
  }
  return context;
};
