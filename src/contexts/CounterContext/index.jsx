import React, { useReducer } from 'react';
import CounterContext from './context';
import PropTypes from 'prop-types';
import { reducer } from './reducer';
import { data } from './data';

const CounterProvider = ({ children }) => {
  const [counterState, counterDispatch] = useReducer(reducer, data);
  return <CounterContext.Provider value={{ counterState, counterDispatch }}>{children}</CounterContext.Provider>;
};

CounterProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CounterProvider;
