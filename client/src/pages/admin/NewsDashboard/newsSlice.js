import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { newsAPI } from "api";

const getNews = createAsyncThunk("news/getNews", async ({ skip, limit }) => {
  const res = await newsAPI.getNews(skip, limit);
  return res.data;
});
const createNews = createAsyncThunk("news/createNews", async (data) => {
  const res = await newsAPI.createNews(data);
  return res.data;
});

const newsSlice = createSlice({
  name: "news",
  initialState: [],
  reducers: {
    editNews: (state, action) => {
      newsAPI.editNews(action.payload.id, action.payload.data);
      return state.map((news) =>
        news._id === action.payload.id
          ? { _id: action.payload.id, updatedAt: (new Date()).toISOString() ,...action.payload.data }
          : news
      );
    },
    deleteNews: (state, action) => {
      newsAPI.deleteNews(action.payload);
      return state.filter((news) => news._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNews.fulfilled, (state, action) => {
        const filter = [];
        return [...state, ...action.payload].filter((news) => {
          if (!filter.includes(news._id)) {
            filter.push(news._id);
            return true;
          } else {
            return false;
          }
        });
      })
      .addCase(createNews.fulfilled, (state, action) => {
        return [...state, action.payload];
      });
  },
});

export { getNews, createNews };
export const { editNews, deleteNews } = newsSlice.actions;
export default newsSlice.reducer;
