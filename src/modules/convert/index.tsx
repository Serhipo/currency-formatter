import React from 'react';
import { Helmet } from 'react-helmet';

import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { down } from 'styled-breakpoints';
import styled from 'styled-components';

import { ContentCard } from '../../shared/ui/components';
import { PageLayout } from '../../shared/ui/layouts';
import { metrics } from '../../styles/theme';
import ConvertForm from './ConvertForm';
import ConvertResult from './ConvertResult';

const Convert: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Currency converter</title>
        <meta
          name="description"
          content="Check out the actual currency exchages!"
        />
        <meta name="keywords" content="Coverter, currency, exchage" />
      </Helmet>
      <PageLayout>
        <ContentWrapper>
          <ContentCard
            title="Convert currency"
            headerIcon={<CurrencyExchangeIcon color="primary" />}
            content={
              <>
                <ConvertForm />
                <ConvertResult />
              </>
            }
          ></ContentCard>
        </ContentWrapper>
      </PageLayout>
    </>
  );
};

const ContentWrapper = styled.div`
  padding: ${metrics.padding.xlContent}px;

  ${down('md')} {
    padding: ${metrics.padding.smContent}px;
  }
`;

export default Convert;
