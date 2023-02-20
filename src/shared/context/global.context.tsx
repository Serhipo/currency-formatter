import React, {
  createContext,
  FunctionComponent,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { useCurrenciesList } from '../../hooks';
import { ConvertFormValues } from '../../modules/convert/ConvertForm';
import { CurrencyListFormValues } from '../../modules/exchangeList/components/CurrencyListForm';
import { CurrencyType } from '../api';
import { ErrorPage, Loader } from '../ui/components';
import { getCurrencyOptions } from '../utils';

export type GlobalContextType = {
  convertFormValues: ConvertFormValues;
  currecyListFormValues: CurrencyListFormValues;
  currenciesOptions: CurrencyType[];
  setCurrecyListFormValues: React.Dispatch<
    React.SetStateAction<CurrencyListFormValues>
  >;
  setConvertFormValues: React.Dispatch<React.SetStateAction<ConvertFormValues>>;
};

export const GlobalContext = createContext<GlobalContextType>({
  convertFormValues: {} as ConvertFormValues,
  currecyListFormValues: {} as CurrencyListFormValues,
  currenciesOptions: [] as CurrencyType[],
  setCurrecyListFormValues: () => null,
  setConvertFormValues: () => null,
});

interface GlobalContextProviderProps {
  children: React.ReactNode;
}

export const GlobalContextProvider: FunctionComponent<
  GlobalContextProviderProps
> = ({ children }) => {
  const { currenciesList, isCurrenciesListLoading, currenciesListError } =
    useCurrenciesList();

  const currenciesOptions = useMemo(
    () => getCurrencyOptions(currenciesList),
    [currenciesList],
  );
  const initialBaseCurrency = currenciesOptions.find((x) => x.code === 'USD');
  const initialToCurrency = currenciesOptions.find((x) => x.code === 'EUR');

  const [currecyListFormValues, setCurrecyListFormValues] =
    useState<CurrencyListFormValues | null>(null);

  const [convertFormValues, setConvertFormValues] =
    useState<ConvertFormValues | null>(null);

  const isInitialized =
    !isCurrenciesListLoading && currecyListFormValues && convertFormValues;

  const value = useMemo<GlobalContextType>(
    () =>
      ({
        currenciesOptions,
        currecyListFormValues,
        convertFormValues,
        setCurrecyListFormValues,
        setConvertFormValues,
      } as GlobalContextType),
    [convertFormValues, currecyListFormValues, currenciesOptions],
  );

  useEffect(() => {
    if (initialBaseCurrency && initialToCurrency) {
      setCurrecyListFormValues({
        baseCurrency: initialBaseCurrency!,
        currenciesList: [],
      });

      setConvertFormValues({
        amount: 1,
        fromCurrency: initialBaseCurrency,
        toCurrency: initialToCurrency,
      });
    }
  }, [initialBaseCurrency, initialToCurrency]);

  return (
    <GlobalContext.Provider value={value}>
      {currenciesListError ? (
        <ErrorPage />
      ) : !isInitialized ? (
        <Loader />
      ) : (
        children
      )}
    </GlobalContext.Provider>
  );
};
