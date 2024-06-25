require('dotenv').config();
const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

const baseUrl = 'https://api-sandbox.uphold.com';
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

app.use(bodyParser.json());

const fetchToken = async () => {
  const tokenResponse = await axios.post(`${baseUrl}/oauth2/token`, new URLSearchParams({
    grant_type: 'client_credentials'
  }), {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
    }
  });
  return tokenResponse.data.access_token;
};

app.get('/currencies', async (req, res) => {
  try {
    const token = await fetchToken();

    const currenciesResponse = await axios.get(`${baseUrl}/v0/assets`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    res.json(currenciesResponse.data);
  } catch (error) {
    console.error('Error fetching currencies:', error);
    res.status(500).json({ error: error.message });
  }
}); 

app.get('/ticker/:currency', async (req, res) => {
  const { currency } = req.params;

  try {
    const token = await fetchToken();

    const exchangeRatesResponse = await axios.get(`${baseUrl}/v0/ticker/${currency}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const exchangeRates = exchangeRatesResponse.data.map(rate => ({
      pair: rate.pair,
      rate: parseFloat(rate.ask) 
    }));
   
    res.json(exchangeRates);
  } 
  catch (error) {
    console.error('Error fetching exchange rates from Uphold API:', error.message);
    res.status(500).json({ error: 'Failed to fetch exchange rates' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
