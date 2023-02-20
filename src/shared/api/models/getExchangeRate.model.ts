export interface GetExchangeRateResponse {
  meta: {
    last_updated_at: string;
  };
  data: {
    [key: string]: ExchangeRateResponseType;
  };
}

export interface ExchangeRateResponseType {
  code: string;
  value: number;
}
