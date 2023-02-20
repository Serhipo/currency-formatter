import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import {
  Autocomplete,
  CircularProgress,
  FormControl,
  TextField,
} from '@mui/material';
import styled from 'styled-components';

import { useExchangeRate } from '../../../hooks';
import { useGlobalContext } from '../../../hooks/global/useGlobalContext';
import { CurrencyType } from '../../../shared/api';
import { metrics } from '../../../styles/theme';

export type CurrencyListFormValues = {
  baseCurrency: CurrencyType;
  currenciesList: CurrencyType[];
};

const CurrencyListForm: React.FC = () => {
  const { currenciesOptions, currecyListFormValues } = useGlobalContext();
  const { setCurrecyListFormValues } = useGlobalContext();

  const {
    control,
    watch,
    formState: { isDirty },
    reset,
    getValues,
    handleSubmit,
  } = useForm<CurrencyListFormValues>({
    defaultValues: currecyListFormValues,
    mode: 'onChange',
  });

  const { baseCurrency, currenciesList } = watch();

  const { triggerExchangeRate, isExchageRateLoading, exchangeRate } =
    useExchangeRate({
      baseCurrency: baseCurrency?.code,
      enabled: currenciesList.length > 0,
    });

  const shouldUpdate = React.useMemo(
    () =>
      currenciesList.length > 0
        ? exchangeRate
          ? !(baseCurrency.code in exchangeRate) && isDirty
          : true
        : false,
    [currenciesList, exchangeRate, isDirty, baseCurrency?.code],
  );

  const onSubmit = React.useCallback(() => {
    triggerExchangeRate();
    reset(
      {},
      {
        keepValues: true,
      },
    );
  }, [reset, triggerExchangeRate]);

  React.useEffect(() => {
    if (shouldUpdate) {
      onSubmit();
    }
  }, [shouldUpdate, onSubmit, setCurrecyListFormValues, getValues]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FieldsWrapper>
        <FieldWrapper>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="baseCurrency"
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  fullWidth
                  onChange={(event, options) => {
                    onChange(options);
                    setCurrecyListFormValues((prev) => ({
                      ...prev,
                      baseCurrency: options,
                    }));
                  }}
                  value={value}
                  options={currenciesOptions}
                  disableClearable
                  isOptionEqualToValue={(option, value) =>
                    option.code === value.code
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="Base currency" />
                  )}
                />
              )}
            />
          </FormControl>
        </FieldWrapper>

        <FieldWrapper>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="currenciesList"
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  fullWidth
                  onChange={(event, options) => {
                    onChange(options);
                    setCurrecyListFormValues((prev) => ({
                      ...prev,
                      currenciesList: options,
                    }));
                  }}
                  value={value}
                  options={currenciesOptions}
                  isOptionEqualToValue={(option, value) =>
                    option.code === value.code
                  }
                  multiple
                  disableClearable
                  renderInput={(params) => (
                    <TextField {...params} label="Currencies list" />
                  )}
                />
              )}
            />
          </FormControl>
          {isExchageRateLoading ? (
            <LoaderWrapper>
              <CircularProgress size={20} />
            </LoaderWrapper>
          ) : null}
        </FieldWrapper>
      </FieldsWrapper>
    </Form>
  );
};

const Form = styled.form`
  display: flex;
  align-self: flex-start;
`;

const FieldsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;

const FieldWrapper = styled.div`
  margin-bottom: ${metrics.margin.doubleBase}px;
  width: 100%;
  position: relative;

  & .MuiFormHelperText-root {
    position: absolute;
    top: 100%;
  }

  & .MuiAutocomplete-root .MuiOutlinedInput-root {
    padding-right: ${metrics.padding.mdContent}px;
  }
`;

const LoaderWrapper = styled.div`
  display: block;
  position: absolute;
  right: ${metrics.margin.tripleBase}px;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default CurrencyListForm;
