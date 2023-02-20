import React from 'react';

import {
  colors,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

import { useExchangeRate } from '../../../../hooks';
import { useGlobalContext } from '../../../../hooks/global/useGlobalContext';
import { getFormattedDate } from '../../../../shared/utils/date.utils';
import EmptyList from './EmptyList';
import ExchangeListRow from './ExchangeListRow';

const ExchangeList: React.FC = React.memo(() => {
  const {
    currecyListFormValues: { baseCurrency, currenciesList },
    currenciesOptions,
  } = useGlobalContext();

  const { lastUpdatedAt, currentExchangeInfo } = useExchangeRate({
    baseCurrency: baseCurrency?.code,
  });

  const activeCurrenciesOptions = React.useMemo(
    () =>
      currenciesOptions.filter((cur) =>
        currenciesList.some((c) => c.code === cur.code),
      ),
    [currenciesList, currenciesOptions],
  );

  const rows = React.useMemo(
    () =>
      currentExchangeInfo
        ? activeCurrenciesOptions.map((c) => {
            const exchangeInfo = currentExchangeInfo.find(
              (exchangeInfo) => exchangeInfo.code === c.code,
            );

            return { ...c, ...exchangeInfo };
          })
        : [],
    [activeCurrenciesOptions, currentExchangeInfo],
  );

  const updatedAt = getFormattedDate(lastUpdatedAt);

  const showEmptyList = rows.length === 0;

  return showEmptyList ? (
    <EmptyList />
  ) : (
    <TableContainer component={Paper}>
      <Table aria-label="Exchange rate">
        <TableHead>
          <TableRow>
            <TableCell>Currency</TableCell>
            <TableCell align="right">
              Exchange rate at:
              <Typography
                variant="subtitle2"
                fontWeight={400}
                color={colors.blue[400]}
              >
                {updatedAt}
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <ExchangeListRow key={`${row.name} ${row.code}`} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});

export default ExchangeList;
