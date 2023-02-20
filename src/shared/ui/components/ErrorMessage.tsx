import React from 'react';

import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { colors, Typography } from '@mui/material';
import styled from 'styled-components';

import { metrics } from '../../../styles/theme';

interface ErrorMessageProps {
  errorMessage: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = React.memo(
  ({ errorMessage }) => (
    <Wrapper>
      <ErrorIcon color="error" />
      <Typography color={colors.red[500]}>{errorMessage}</Typography>
    </Wrapper>
  ),
);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ErrorIcon = styled(ErrorOutlineIcon)`
  margin-right: ${metrics.margin.doubleBase}px;
`;

export default ErrorMessage;
