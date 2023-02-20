import React from 'react';
import { Controller, useForm } from 'react-hook-form';

import SyncIcon from '@mui/icons-material/Sync';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import {
  Autocomplete,
  Button,
  colors,
  FormControl,
  IconButton,
  TextField,
} from '@mui/material';
import { down } from 'styled-breakpoints';
import styled from 'styled-components';

import { useExchangeRate } from '../../hooks';
import { useGlobalContext } from '../../hooks/global/useGlobalContext';
import { CurrencyType } from '../../shared/api';
import { metrics } from '../../styles/theme';

export type ConvertFormValues = {
  amount: number;
  fromCurrency: CurrencyType;
  toCurrency: CurrencyType;
};

const ConvertForm: React.FC = () => {
  const {
    convertFormValues: { amount, fromCurrency, toCurrency },
    currenciesOptions,
    setConvertFormValues,
  } = useGlobalContext();

  const { triggerExchangeRate, isExchageRateLoading, currentExchangeInfo } =
    useExchangeRate({
      baseCurrency: fromCurrency?.code,
      useAsLazy: true,
    });

  const {
    register,
    control,
    watch,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<ConvertFormValues>({
    defaultValues: {
      amount,
      fromCurrency,
      toCurrency,
    },
    mode: 'onChange',
  });

  const currentFromCurrency = watch('fromCurrency');

  const onChangeCurrencyClick = React.useCallback(() => {
    setValue('fromCurrency', toCurrency);
    setValue('toCurrency', fromCurrency);
    setConvertFormValues((prev) => ({
      ...prev,
      fromCurrency: toCurrency,
      toCurrency: fromCurrency,
    }));
  }, [setValue, setConvertFormValues, toCurrency, fromCurrency]);

  const onSubmit = React.useCallback(() => {
    triggerExchangeRate();
  }, [triggerExchangeRate]);

  React.useEffect(() => {
    if (!currentExchangeInfo && !isExchageRateLoading) {
      onSubmit();
    }
  }, [currentExchangeInfo, onSubmit, isExchageRateLoading]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FieldsWrapper>
        <FieldWrapper>
          <TextField
            label="Amount"
            error={!!errors.amount?.message}
            helperText={errors.amount?.message}
            InputProps={{
              startAdornment: <span>{currentFromCurrency?.symbol}</span>,
            }}
            fullWidth
            type="number"
            {...register('amount', {
              validate: {
                positive: (amount: number) => {
                  if (amount > 0) {
                    setConvertFormValues((prev) => ({ ...prev, amount }));
                    return true;
                  }

                  return 'Should be greated than 0';
                },
              },
              valueAsNumber: true,
            })}
          />
        </FieldWrapper>

        <FieldWrapper>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="fromCurrency"
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  onChange={(event, fromCurrency) => {
                    onChange(fromCurrency);
                    setConvertFormValues((prev) => ({ ...prev, fromCurrency }));
                  }}
                  fullWidth
                  value={value}
                  options={currenciesOptions}
                  disableClearable
                  isOptionEqualToValue={(option, value) =>
                    option.code === value.code
                  }
                  renderInput={(params) => (
                    <TextField {...params} label="From" />
                  )}
                />
              )}
            />
          </FormControl>
        </FieldWrapper>

        <ChangeCurrencyButton onClick={onChangeCurrencyClick}>
          <SyncAltIcon color="primary" />
        </ChangeCurrencyButton>

        <FieldWrapper>
          <FormControl fullWidth>
            <Controller
              control={control}
              name="toCurrency"
              render={({ field: { value, onChange } }) => (
                <Autocomplete
                  fullWidth
                  onChange={(event, toCurrency) => {
                    onChange(toCurrency);
                    setConvertFormValues((prev) => ({ ...prev, toCurrency }));
                  }}
                  value={value}
                  options={currenciesOptions}
                  isOptionEqualToValue={(option, value) =>
                    option.code === value.code
                  }
                  disableClearable
                  renderInput={(params) => <TextField {...params} label="To" />}
                />
              )}
            />
          </FormControl>
        </FieldWrapper>
      </FieldsWrapper>

      <SubmitButton
        disabled={isExchageRateLoading}
        type="submit"
        variant="contained"
        startIcon={currentExchangeInfo ? <SyncIcon /> : null}
      >
        {currentExchangeInfo ? 'Update' : 'Convert'}
      </SubmitButton>
    </Form>
  );
};

const FieldsWrapper = styled.div`
  display: flex;
  align-items: center;

  ${down('sm')} {
    flex-direction: column;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const ChangeCurrencyButton = styled(IconButton)`
  border-radius: 50%;
  border: 1px solid ${colors.blue[700]};
  margin-right: ${metrics.margin.doubleBase}px;

  ${down('sm')} {
    margin-right: 0;
    margin-bottom: ${metrics.margin.doubleBase}px;
  }
`;

const FieldWrapper = styled.div`
  width: 100%;

  &:not(:last-of-type) {
    margin-right: ${metrics.margin.doubleBase}px;
  }

  & .MuiFormHelperText-root {
    position: absolute;
    top: 100%;
  }

  ${down('sm')} {
    margin-right: 0;
    margin-bottom: ${metrics.margin.doubleBase}px;
  }
`;

const SubmitButton = styled(Button)`
  width: fit-content;
  margin-top: ${metrics.margin.doubleBase}px;
  margin-bottom: ${metrics.margin.base}px;
  justify-content: flex-end;
  align-self: flex-end;

  ${down('sm')} {
    width: 100%;
    justify-content: center;
  }
`;

export default ConvertForm;
