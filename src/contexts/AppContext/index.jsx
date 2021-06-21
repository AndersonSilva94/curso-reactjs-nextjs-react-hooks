// **********************************************************************
// aula sobre useContext() - parte 2
import React, { useState } from 'react';
import { globalState } from './data';

export const GlobalContext = React.createContext();

// eslint-disable-next-line
export const AppContext = ({ children }) => {
  const [state, setState] = useState(globalState);

  return <GlobalContext.Provider value={{ state, setState }}>{children}</GlobalContext.Provider>;
};
