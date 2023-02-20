import axios from 'axios';

import { currencyApiConfig } from '../config';
import { GetExchangeRateResponse } from '../shared/api';
import { GetCurrenciesListResponse } from './../shared/api/models/getCurrenciesList.model';

class CurrencyApiClient {
  private axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: currencyApiConfig.currencyApiUrl,
      params: {
        apikey: currencyApiConfig.currencyApiKey,
      },
    });
  }

  async currencies(params: { currencies?: string } = {}) {
    return await this.axiosInstance
      .get<GetCurrenciesListResponse>(`/currencies`, {
        params,
      })
      .then((res) => res.data);
  }

  async latest({
    baseCurrency = '',
    currencies = [],
  }: {
    baseCurrency?: string;
    currencies?: string[];
  }) {
    const params = {
      base_currency: baseCurrency,
      currencies: currencies.join(','),
    };

    const { data } = await this.axiosInstance.get<GetExchangeRateResponse>(
      `/latest`,
      {
        params,
      },
    );
    const { data: exchange, meta } = data;

    return {
      exchangeInfo: {
        [baseCurrency]: Object.values(exchange),
      },
      lastUpdatedAt: meta.last_updated_at,
    };
  }
}

const currencyClient = new CurrencyApiClient();

export default currencyClient;
