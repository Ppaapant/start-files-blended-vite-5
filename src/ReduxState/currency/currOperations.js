import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo } from "../../service/opencagedataApi";
import { exchangeCurrency, latestRates } from "../../service";

export const fetchBaseCurrency = createAsyncThunk(
    'currency/fetchBaseCurrency',
    async(coords, thunkAPI) => {
        const state = thunkAPI.getState();
        const {baseCurrency} = state.currency;
        
        if (baseCurrency) {
            return thunkAPI.rejectWithValue('We already have base currency!')
        }



    try{
    const data = await getUserInfo(coords);
    return data;
    }catch(error){
        return thunkAPI.rejectWithValue(error.message);
    }
    }
);

export const fetchExchange = createAsyncThunk(
    'currency/fetchExchange',
    async (params, thunkAPI) => {
      try {
        const data = await exchangeCurrency(params);
        return data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  );

  export const fetchLatestRates = createAsyncThunk(
    'currency/fetchExchange',
    async (baseCurrency, thunkAPI) => {
        try{
            const data = await latestRates(baseCurrency);
            return data;
        } catch(error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
  );