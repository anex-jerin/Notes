import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';

export const store = configureStore({
  reducer: { [apiSlice.reducerPath]: apiSlice.reducer },
  middleware: (getDefault) => getDefault().concat(apiSlice.middleware),
  devTools: true,
});
