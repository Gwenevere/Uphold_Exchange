import SDK from '@uphold/uphold-sdk-javascript';

const sdk = new SDK({
  baseUrl: 'https://api-sandbox.uphold.com',
  clientId: 'ed1c480dacc10656f894ef5f906d1dfcbb4c5f52', 
  clientSecret: '1d305ed25dc05e734aaebcbe1b5434c7d88cebb7'
});

export default sdk;
