import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

import { AxiosError, isAxiosError } from 'axios';

import { currencyApiClient } from '../../services';
import { GetCurrenciesListResponse, QUERY_TYPES } from '../../shared/api';

export const useCurrenciesList = () => {
  const { isFetching, isLoading, error, data } =
    useQuery<GetCurrenciesListResponse>(
      QUERY_TYPES.CurrenciesList,
      () => currencyApiClient.currencies(),
      {
        staleTime: 1000 * 60 * 60, // 1 hour
        cacheTime: 1000 * 60 * 60, // 1 hour
        onError(err) {
          const errorMessage = isAxiosError(err)
            ? err.response?.data?.message ?? err.message
            : 'Error while fetching currencies list';
          toast.error(`Currencies list: ${errorMessage}`, {
            toastId: QUERY_TYPES.CurrenciesList,
          });
        },
      },
    );

  return useMemo(
    () => ({
      currenciesList: Object.values(data?.data ?? {}),
      isCurrenciesListLoading: isFetching || isLoading,
      currenciesListError: error as AxiosError,
    }),
    [error, data, isLoading, isFetching],
  );
};
