import React from 'react';
import { Helmet } from 'react-helmet';

import CreditCardIcon from '@mui/icons-material/CreditCard';
import { down } from 'styled-breakpoints';
import styled from 'styled-components';

import { ContentCard } from '../../shared/ui/components';
import { PageLayout } from '../../shared/ui/layouts';
import { metrics } from '../../styles/theme';
import CurrencyListForm from './components/CurrencyListForm';
import ExchangeList from './components/ExchangeList/ExchangeList';

const Landing: React.FC = () => (
  <>
    <Helmet>
      <title>Currencies list</title>
      <meta
        name="description"
        content="Check out the actual currency exchages!"
      />
      <meta name="keywords" content="Coverter, currency, exchage" />
    </Helmet>
    <PageLayout>
      <ContentWrapper>
        <ContentCard
          title="Exchange rates list"
          headerIcon={<CreditCardIcon color="primary" />}
          content={
            <>
              <CurrencyListForm />
              <ExchangeList />
            </>
          }
        />
      </ContentWrapper>
    </PageLayout>
  </>
);

const ContentWrapper = styled.div`
  padding: ${metrics.padding.mdContent}px;

  ${down('md')} {
    padding: ${metrics.padding.smContent}px;
  }
`;

export default Landing;
