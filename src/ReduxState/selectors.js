export const selectBaseCurrency = state => state.currency.baseCurrency;
export const selectRates = state => state.currency.rates;
export const selectIsLoading = state => state.currency.isLoading;
export const selectIsError = state => state.currency.isError;