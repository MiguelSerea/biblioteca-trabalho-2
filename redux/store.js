import { configureStore } from '@reduxjs/toolkit';
import livroReducer from './livroSlice';

export const store = configureStore({
  reducer: {
    livros: livroReducer,
  },
});