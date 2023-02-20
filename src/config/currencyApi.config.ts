/**
 * CurrencyAPI config.
 *
 * @property {string} currencyApiUrl - CurrencyApi URL.
 * @property {string} currencyApiKey - CurrencyApi API key.
 */
const currencyApiConfig = {
  currencyApiUrl: process.env.REACT_APP_CURRENCY_API_URL ?? '',
  currencyApiKey: process.env.REACT_APP_CURRENCY_API_KEY ?? '',
};

export default currencyApiConfig;
