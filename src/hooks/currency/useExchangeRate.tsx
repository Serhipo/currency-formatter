import { useCallback, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

import { AxiosError, isAxiosError } from 'axios';

import { currencyApiClient } from '../../services';
import { ExchangeRateResponseType, QUERY_TYPES } from '../../shared/api';

export type ExchangeRateInfoType = {
  lastUpdatedAt: string;
  exchangeInfo: {
    [key: string]: ExchangeRateResponseType[];
  };
};

export const useExchangeRate = ({
  baseCurrency = '',
  enabled = false,
  useAsLazy = false,
}: {
  baseCurrency: string;
  enabled?: boolean;
  useAsLazy?: boolean;
}) => {
  const queryClient = useQueryClient();

  const [isQueryEnabled, setIsQueryEnabled] = useState<boolean>(false);

  const { error, data, refetch, isFetching } = useQuery<ExchangeRateInfoType>(
    QUERY_TYPES.ExchangeRate,
    async () => {
      const { exchangeInfo, lastUpdatedAt } = await currencyApiClient.latest({
        baseCurrency,
      });

      return queryClient.setQueryData<ExchangeRateInfoType>(
        QUERY_TYPES.ExchangeRate,
        (old) => {
          if (old) {
            return {
              lastUpdatedAt,
              exchangeInfo: {
                ...old.exchangeInfo,
                [baseCurrency]: exchangeInfo[baseCurrency],
              },
            };
          }

          return {
            exchangeInfo,
            lastUpdatedAt,
          };
        },
      );
    },
    {
      enabled: useAsLazy ? isQueryEnabled : enabled,
      refetchOnMount: false,
      onError(err) {
        const errorMessage = isAxiosError(err)
          ? err.response?.data?.message ?? err.message
          : 'Error while fetching currencies list';
        toast.error(`Exchange rate: ${errorMessage}`, {
          toastId: QUERY_TYPES.ExchangeRate,
        });
      },
      onSettled() {
        setIsQueryEnabled(false);
      },
      refetchInterval: 1000 * 10, // 10 sec
    },
  );

  const triggerExchangeRate = useCallback(() => {
    if (enabled) {
      refetch();
    }
    if (useAsLazy) {
      setIsQueryEnabled(true);
    }
  }, [enabled, useAsLazy, refetch]);

  return useMemo(
    () => ({
      isExchageRateLoading: isFetching,
      exchageRateError: error as AxiosError,
      exchangeRate: data?.exchangeInfo,
      lastUpdatedAt: data?.lastUpdatedAt,
      currentExchangeInfo: data?.exchangeInfo?.[baseCurrency],
      triggerExchangeRate,
    }),
    [isFetching, data, baseCurrency, error, triggerExchangeRate],
  );
};
