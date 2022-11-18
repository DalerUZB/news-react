import { createSlice } from "@reduxjs/toolkit";
import { fetchNews } from "./action";

const state = {
  news: [],
  loader: false,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState: state,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNews.pending, (state, action) => {
      state.loader = true;
    });
    builder.addCase(fetchNews.fulfilled, (state, action) => {
      state.news = action.payload;
      state.loader = false;
    });
    builder.addCase(fetchNews.rejected, (state, action) => {
      state.loader = false;
    });
  },
});

export default counterSlice.reducer;
