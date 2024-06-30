import { configureStore } from '@reduxjs/toolkit';
import { newsReducer, newsMiddleware } from './API';

export const store = configureStore({
  reducer: {
    // Agrega otros reducers aquí según sea necesario
    news: newsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsMiddleware),
});
