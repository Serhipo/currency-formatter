import React from 'react';

import styled from 'styled-components';

import { metrics } from '../../../styles/theme';
import { Navbar } from '../components';

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <ContentWrapper>{children}</ContentWrapper>
    </>
  );
};

const ContentWrapper = styled.div`
  margin: 0 auto;
  max-width: ${metrics.pageSize.maxWidth}px;
`;

export default PageLayout;
