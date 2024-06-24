const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

const baseUrl = 'https://api-sandbox.uphold.com';
const clientId = 'ed1c480dacc10656f894ef5f906d1dfcbb4c5f52';
const clientSecret = '1d305ed25dc05e734aaebcbe1b5434c7d88cebb7';

app.use(bodyParser.json());

app.get('/currencies', async (req, res) => {
  try {
    const tokenResponse = await axios.post(`${baseUrl}/oauth2/token`, new URLSearchParams({
        grant_type: 'client_credentials'
      }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
      }
    });

    const token = tokenResponse.data.access_token;

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
    const tokenResponse = await axios.post(`${baseUrl}/oauth2/token`, new URLSearchParams({
      grant_type: 'client_credentials'
    }), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(`${clientId}:${clientSecret}`),
      }
    });

    const token = tokenResponse.data.access_token;

    const exchangeRatesResponse = await axios.get(`${baseUrl}/v0/ticker/${currency}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
   
    res.json(exchangeRatesResponse.data);
  } 
  catch (error) {
    console.error('Error fetching exchange rates from Uphold API:', error.message);
    res.status(500).json({ error: 'Failed to fetch exchange rates' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
