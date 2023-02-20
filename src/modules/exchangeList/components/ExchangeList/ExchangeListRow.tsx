import React from 'react';

import { colors, TableCell, TableRow } from '@mui/material';
import styled from 'styled-components';

import { CurrencyType } from '../../../../shared/api';
import { metrics } from '../../../../styles/theme';

interface TableRowProps {
  row: CurrencyType & {
    value?: number;
  };
}

const ExchangeListRow: React.FC<TableRowProps> = React.memo(({ row }) => (
  <CustomTableRow>
    <TableCell component="th" scope="row">
      {`${row.code} |`}
      <CurrencyName>{row.name}</CurrencyName>
    </TableCell>
    <TableCell align="right">{row.value}</TableCell>
  </CustomTableRow>
));

const CustomTableRow = styled(TableRow)`
  &:last-child td,
  &:last-child th {
    border: none;
  }
`;

const CurrencyName = styled.span`
  color: ${colors.grey[500]};
  padding-left: ${metrics.margin.halfBase}px;
`;

export default ExchangeListRow;
