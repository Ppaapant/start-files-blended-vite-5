// import { configureStore } from "@reduxjs/toolkit";
// import persistReducer from "redux-persist/es/persistReducer";
// import {currencyReducer} from './currency/currencySlice'
// import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
// import persistStore from "redux-persist/es/persistStore";
// const persistConfig = {
//     key: 'currency',
//     storage,
//     whitelist: ['baseCurrency'],
// };

// const perisestedReducer = persistReducer(persistConfig, currencyReducer);

// export const store = configureStore({
//     reducer: {
//         currency: persistReducer
//     },

//     middleware: getDefaultMiddleware =>
//         getDefaultMiddleware({
//             serializableCheck: {
//                 ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
//             },
//         }),


    
// });

// export const persistor = persistStore(store);



import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { currencyReducer } from './currency/currencySlice'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist:['baseCurrency']
}

const persistedReducer = persistReducer(persistConfig, currencyReducer)

export const store = configureStore({
  reducer: {currency: persistedReducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const  persistor = persistStore(store)



