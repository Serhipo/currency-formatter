import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import ConvertPage from '../modules/convert';
import ExchangeListPage from '../modules/exchangeList';
import { ErrorPage, Loader } from '../shared/ui/components';

export enum ROUTES {
  ExchangeListPage = '/',
  ConvertPage = '/convert',
}

const router = createBrowserRouter([
  {
    path: ROUTES.ExchangeListPage,
    element: (
      <Suspense fallback={<Loader />}>
        <ExchangeListPage />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: ROUTES.ConvertPage,
    element: (
      <Suspense fallback={<Loader />}>
        <ConvertPage />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
  },
]);

export default router;
