import React from 'react';

import { Card, colors, Typography } from '@mui/material';
import styled from 'styled-components';

import { metrics } from '../../../styles/theme';

interface ContentCardProps {
  title: string;
  headerIcon: React.ReactNode;
  content: React.ReactNode;
}

const ContentCard: React.FC<ContentCardProps> = React.memo(
  ({ content, title, headerIcon }) => (
    <Card>
      <CardContent>
        <HeaderWrapper>
          {headerIcon}
          <Title variant="h6" fontWeight={500}>
            {title}
          </Title>
        </HeaderWrapper>
        <ContentWrapper>{content}</ContentWrapper>
      </CardContent>
    </Card>
  ),
);

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  margin-bottom: ${metrics.margin.tripleBase}px;
`;

const Title = styled(Typography)`
  margin-left: ${metrics.margin.base}px;
  color: ${colors.blue[500]};
`;

const CardContent = styled.div`
  padding: ${metrics.padding.tripleBase}px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

export default ContentCard;
