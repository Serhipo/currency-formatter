import React from 'react';

import { colors, Typography } from '@mui/material';
import styled from 'styled-components';

import { useExchangeRate } from '../../hooks';
import { useGlobalContext } from '../../hooks/global/useGlobalContext';
import { ErrorMessage, Loader } from '../../shared/ui/components';
import { getConvertedCurrenciesInfo } from '../../shared/utils';
import { metrics } from '../../styles/theme';

const ConvertResult: React.FC = React.memo(() => {
  const {
    convertFormValues: { fromCurrency, amount, toCurrency },
  } = useGlobalContext();

  const {
    isExchageRateLoading,
    exchageRateError,
    currentExchangeInfo,
    lastUpdatedAt,
  } = useExchangeRate({
    baseCurrency: fromCurrency?.code,
    useAsLazy: true,
  });

  const currenciesInfo = React.useMemo(
    () =>
      getConvertedCurrenciesInfo({
        amount,
        fromCurrency,
        toCurrency,
        lastUpdatedAt,
        currentExchangeInfo,
      }),
    [currentExchangeInfo, amount, fromCurrency, toCurrency, lastUpdatedAt],
  );

  const showExchangeResult = currentExchangeInfo && currenciesInfo;
  const showLoader = isExchageRateLoading && !currentExchangeInfo;

  return (
    <Wrapper>
      {showLoader ? (
        <LoaderWrapper>
          <Loader />
        </LoaderWrapper>
      ) : exchageRateError ? (
        <ErrorMessage
          errorMessage={
            exchageRateError?.message ?? 'Something wrong, please, try later!'
          }
        />
      ) : showExchangeResult ? (
        <Typography variant="h6" fontWeight={500} color={colors.blue[500]}>
          {currenciesInfo.fromCurrencyText} = {currenciesInfo.toCurrencyText}
          {currenciesInfo.lastUpdate && (
            <Typography variant="body2">
              {`Last update:
              ${currenciesInfo.lastUpdate}`}
            </Typography>
          )}
        </Typography>
      ) : null}
    </Wrapper>
  );
});

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const LoaderWrapper = styled.div`
  margin: ${metrics.margin.base}px;
`;

export default ConvertResult;
