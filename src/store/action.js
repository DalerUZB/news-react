import { api } from "../api";
const { createAsyncThunk } = require("@reduxjs/toolkit");

export const fetchNews = createAsyncThunk("data/fetchNews", async (data) => {
  const result = await api.fetchData(data);
  return result.articles;
});
