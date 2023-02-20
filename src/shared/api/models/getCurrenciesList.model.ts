export interface GetCurrenciesListResponse {
  data: {
    [key: string]: CurrencyResponseType;
  };
}

export interface CurrencyResponseType {
  symbol: string;
  name: string;
  symbol_native: string;
  decimal_digits: number;
  rounding: number;
  code: string;
  name_plural: string;
}
