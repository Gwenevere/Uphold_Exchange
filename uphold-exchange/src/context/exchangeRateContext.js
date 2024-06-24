import React, {createContext, useReducer} from 'react';
import useCurrencies from '../hooks/useCurrencies';
import useExchangeRates from '../hooks/useExchangeRates';

const ExchangeRateContext = createContext();

const initialState = {
    amount: 1,
    currency: 'USD',
    exchangeRates: {},
}

const reducer = (state, action) => {
    switch (action.type) {
      case 'SET_AMOUNT':
        return { ...state, amount: action.payload };
      case 'SET_CURRENCY':
        return { ...state, currency: action.payload };
      case 'SET_EXCHANGE_RATES':
        return { ...state, exchangeRates: { ...state.exchangeRates, ...action.payload } };
      default:
        return state;
    }
  };

const ExchangeRateProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const currencies = useCurrencies();
    const exchangeRates = useExchangeRates(state.currency);

    const setAmount = (amount) => dispatch({ type: 'SET_AMOUNT', payload: amount });
    const setCurrency = (currency) => dispatch({ type: 'SET_CURRENCY', payload: currency });
    const setExchangeRates = (rates) => dispatch({ type: 'SET_EXCHANGE_RATES', payload: rates });

    return (
        <ExchangeRateContext.Provider
          value={{
            ...state,
            currencies,
            setAmount,
            setCurrency,
            setExchangeRates,
            exchangeRates,
          }}
        >
          {children}
        </ExchangeRateContext.Provider>
      );
};

export { ExchangeRateContext, ExchangeRateProvider }