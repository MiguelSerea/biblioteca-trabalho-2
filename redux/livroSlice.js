import { createSlice } from '@reduxjs/toolkit';

export const livroSlice = createSlice({
  name: 'livro',
  initialState: {
    total: 0,
  },
  reducers: {
    incrementar: (state) => {
      state.total += 1;
    },
    decrementar: (state) => {
      if (state.total > 0) state.total -= 1;
    },
  },
});

export const { incrementar, decrementar } = livroSlice.actions;
export default livroSlice.reducer;