import { createSlice } from "@reduxjs/toolkit";
import { fetchBaseCurrency, fetchExchange, fetchLatestRates } from "./currOperations";
const initialState = {
    baseCurrency:'',
    exchangeInfo: {
        to: 'UAH',
        from: 'USD',
        amount: 15,
        rate: 37.5,
        result: 562.5
      },
    isLoading: false,
    isError: null,
    rates: [],
  };


const currencySlice = createSlice({
 name: 'currency',
 initialState,
 reducers: {
    setBaseCurrency: (state, {payload}) => {
        state.baseCurrency = payload;
    },
 },

 extraReducers : builder => {
    builder
    .addCase(fetchBaseCurrency.pending, (state, {payload}) => {
        state.baseCurrency = payload;
        state.isLoading = true;
    })
    .addCase(fetchBaseCurrency.fulfilled, (state, {payload}) => {
        state.baseCurrency = payload;
        state.isLoading = false;
    })
    .addCase(fetchBaseCurrency.rejected, (state, { payload }) => {
      state.isLoading = false;
      state.isError = payload;
  })
  
  
  
  .addCase(fetchLatestRates.pending, (state) => {
    state.isLoading = true;
    state.isError = null;
  })
  .addCase(fetchLatestRates.fulfilled, (state, { payload }) => {
    state.rates = payload;
    state.isLoading = false;
  })
  .addCase(fetchLatestRates.rejected, (state, { payload }) => {
    state.isError = payload;
    state.isLoading = false;
  })
 }
})

export const { setBaseCurrency } = currencySlice.actions;
export  const currencyReducer = currencySlice.reducer;