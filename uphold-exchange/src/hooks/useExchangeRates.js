import { useState, useEffect } from 'react';

const useExchangeRates = (currency) => {
  const [exchangeRates, setExchangeRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
    const fetchExchangeRates = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:5000/ticker/${currency}`);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setExchangeRates(data);
      }
      catch(error) {
        console.error('Error fetching exchange rates:', error);
        setError('Failed to fetch exchange rates');
        setExchangeRates([]);
      } 
      finally {
        setLoading(false);
      }
    };

    if(currency) {
      fetchExchangeRates();
    }}, [currency]);

  return { exchangeRates, loading, error };

};

export default useExchangeRates;
