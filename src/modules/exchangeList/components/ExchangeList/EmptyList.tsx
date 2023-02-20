import React from 'react';

import { colors, Typography } from '@mui/material';
import styled from 'styled-components';

const EmptyList: React.FC = React.memo(() => (
  <Wrapper>
    <Typography color={colors.blue[500]}>
      Choose any currency to show the exchange rates!
    </Typography>
  </Wrapper>
));

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default EmptyList;
