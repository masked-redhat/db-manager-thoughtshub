import React, { createContext, useContext, useState } from "react";

const DisableContext = createContext();

const DisableProvider = ({ children }) => {
  const [disabled, setDisabled] = useState(false);

  return (
    <DisableContext.Provider value={{ disabled, setDisabled }}>
      {children}
    </DisableContext.Provider>
  );
};

export default DisableProvider;

export const useDisabled = () => useContext(DisableContext);
