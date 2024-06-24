import { useState, useEffect } from 'react';

const useCurrencies = () => {
  const [currencies, setCurrencies] = useState([]);
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCurrencies = async () => {
     // setLoading(true);
     // setError(null);

      try {
        const response = await fetch('http://localhost:5000/currencies');

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        setCurrencies(data);
      } 
      catch (error) {
        console.error('Error fetching currencies:', error);
      //  setError('Failed to fetch currencies');
        setCurrencies([]);
      }
    //  finally {
       // setLoading(false);
   //   }
    };

    fetchCurrencies();
  }, []);

  return currencies;
};

export default useCurrencies;
