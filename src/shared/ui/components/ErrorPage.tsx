import React from 'react';
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';

import { Button, Typography } from '@mui/material';
import styled from 'styled-components';

import { ROUTES } from '../../../routes';
import { metrics } from '../../../styles/theme';

const ErrorPage: React.FC = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const isNotFoundError = isRouteErrorResponse(error)
    ? error.status === 404
    : false;

  const errorText = isNotFoundError
    ? "The page you're looking for doesn't exist."
    : 'Something unexpect happened, we are working on this!';
  const buttonText = isNotFoundError ? 'Back home' : 'Reload page';
  const buttonAction = isNotFoundError
    ? () => navigate(ROUTES.ExchangeListPage)
    : () => window.location.reload();

  return (
    <Wrapper>
      <Label variant="h4">Opps..</Label>
      <Label variant="h6">{errorText}</Label>
      <ButtonLink variant="contained" onClick={buttonAction}>
        {buttonText}
      </ButtonLink>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  max-width: fit-content;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 100vh;
  text-align: center;
`;

const Label = styled(Typography)`
  margin-bottom: ${metrics.margin.doubleBase}px;
`;

const ButtonLink = styled(Button)`
  a {
    color: white;
  }
`;

export default ErrorPage;
