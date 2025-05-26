"use client";

import { createContext, useContext, useState } from "react";

const TransferContext = createContext<any>(null);

export const TransferProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [data, setData] = useState<any>(null);

  return (
    <TransferContext.Provider value={{ data, setData }}>
      {children}
    </TransferContext.Provider>
  );
};

export const useTransfer = () => useContext(TransferContext);
