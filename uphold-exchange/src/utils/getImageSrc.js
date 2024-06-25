export const getImageSrc = (currencyCode) => {
    try {
      return require(`../assets/${currencyCode}.png`);
    } 
    catch (error) {
      return require(`../assets/Crypto.png`);
    }
};
