import React from 'react';

import { CircularProgress } from '@mui/material';
import styled from 'styled-components';

interface LoaderProps {
  size?: number;
}

const Loader: React.FC<LoaderProps> = ({ size = 40 }) => (
  <Wrapper>
    <CircularProgress size={size} />
  </Wrapper>
);

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
`;

export default Loader;
