import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchNewsIds, fetchNewsItem } from '../../api/newsApi';

export const fetchNews = createAsyncThunk('news/fetchNews', async () => {
  const newsIds = await fetchNewsIds();
  const news = await Promise.all(newsIds.map(async (id) => {
    const story = await fetchNewsItem(id);
    return story;
  }));
  return news;
});

const newsListSlice = createSlice({
  name: 'newsList',
  initialState: {
    newsList: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.newsList = action.payload;
        state.loading = false;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default newsListSlice.reducer;
