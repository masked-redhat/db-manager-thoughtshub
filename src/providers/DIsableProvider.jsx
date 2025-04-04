import React, { createContext, useContext, useState } from "react";

const DisableContext = createContext();

const DisableProvider = ({ children }) => {
  const [disable, setDisable] = useState(false);

  return (
    <DisableContext.Provider value={{ disable, setDisable }}>
      {children}
    </DisableContext.Provider>
  );
};

export default DisableProvider;

export const useToken = () => useContext(DisableContext);
