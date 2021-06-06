import { useContext } from 'react';
import { GlobalContext } from '../../contexts/AppContext';

// desabilitar eslint em uma linha específica
// eslint-disable-next-line
export const P = ({ children }) => {
  const theContext = useContext(GlobalContext);
  const {
    state: { body, counter },
    state,
    setState,
  } = theContext;
  // return <p onClick={() => setContextState({ ...contextState, counter: counter + 1 })}>{body}</p>;
  return <p onClick={() => setState((s) => ({ ...s, counter: s.counter + 1 }))}>{body}</p>;
};
