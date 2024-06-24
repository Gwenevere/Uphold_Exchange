import React, {createContext, useReducer, useEffect} from 'react';
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
    const { exchangeRates, loading, error} = useExchangeRates(state.currency);

    useEffect(() => {
        if (exchangeRates) {
          dispatch({ type: 'SET_EXCHANGE_RATES', payload: exchangeRates });
        }
      }, [exchangeRates]);

    const setAmount = (amount) => dispatch({ type: 'SET_AMOUNT', payload: amount });
    const setCurrency = (currency) => dispatch({ type: 'SET_CURRENCY', payload: currency });

    return (
        <ExchangeRateContext.Provider
          value={{
            ...state,
            currencies,
            setAmount,
            setCurrency,
            exchangeRates,
            loading,
            error
          }}
        >
          {children}
        </ExchangeRateContext.Provider>
      );
};

export { ExchangeRateContext, ExchangeRateProvider }