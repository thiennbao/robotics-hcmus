import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resourceApi } from "api";

const getBanners = createAsyncThunk("banner/getBanners", async ({ skip, limit }) => {
  const res = await resourceApi.getResources({
    resource: "banner",
    skip,
    limit,
    sort: "createdAt",
    order: "desc",
  });
  return res.data;
});
const postBanner = createAsyncThunk("banner/postBanner", async ({ data }) => {
  const res = await resourceApi.postResource({ resource: "banner", data });
  return res.data;
});
const patchBanner = createAsyncThunk("banner/patchBanner", async ({ id, data }) => {
  const res = await resourceApi.patchResource({ resource: "banner", id, data });
  return res.data;
});
const deleteBanner = createAsyncThunk("banner/deleteBanner", async ({ id }) => {
  const res = await resourceApi.deleteResource({ resource: "banner", id });
  return res.data;
});

const bannerSlice = createSlice({
  name: "banner",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(getBanners.fulfilled, (state, action) => {
      const filter = []; // Hold items' id
      state.forEach((banner) => filter.push(banner._id));
      action.payload.forEach((banner) => {
        if (!filter.includes(banner._id)) {
          state.push(banner);
        }
      });
      return state;
    });
    builder.addCase(postBanner.fulfilled, (state, action) => {
      return [...state, action.payload];
    });
    builder.addCase(patchBanner.fulfilled, (state, action) => {
      return state.map((banner) => (banner._id === action.payload._id ? action.payload : banner));
    });
    builder.addCase(deleteBanner.fulfilled, (state, action) => {
      return state.filter((banner) => banner._id !== action.payload._id);
    });
  },
});

export { getBanners, postBanner, patchBanner, deleteBanner };
export default bannerSlice.reducer;
