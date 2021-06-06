import { useContext } from 'react';
import { GlobalContext } from '../../contexts/AppContext';

// desabilitar eslint em uma linha específica
// eslint-disable-next-line
export const H1 = ({ children }) => {
  const theContext = useContext(GlobalContext);
  const {
    state: { title, counter },
  } = theContext;
  return (
    <h1>
      {title} {counter}
    </h1>
  );
};
