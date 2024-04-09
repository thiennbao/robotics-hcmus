import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resourceApi } from "api";

const getContactInfos = createAsyncThunk("contactInfo/getContactInfos", async ({ skip, limit }) => {
  const res = await resourceApi.getResources({
    resource: "contactInfo",
    skip,
    limit,
  });
  return res.data;
});
const postContactInfo = createAsyncThunk("contactInfo/postContactInfo", async ({ data }) => {
  const res = await resourceApi.postResource({ resource: "contactInfo", data });
  return res.data;
});
const patchContactInfo = createAsyncThunk("contactInfo/patchContactInfo", async ({ id, data }) => {
  const res = await resourceApi.patchResource({ resource: "contactInfo", id, data });
  return res.data;
});
const deleteContactInfo = createAsyncThunk("contactInfo/deleteContactInfo", async ({ id }) => {
  const res = await resourceApi.deleteResource({ resource: "contactInfo", id });
  return res.data;
});

const contactInfoSlice = createSlice({
  name: "contactInfo",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(getContactInfos.fulfilled, (state, action) => {
      const filter = []; // Hold items' id
      state.forEach((contactInfo) => filter.push(contactInfo._id));
      action.payload.forEach((contactInfo) => {
        if (!filter.includes(contactInfo._id)) {
          state.push(contactInfo);
        }
      });
      return state;
    });
    builder.addCase(postContactInfo.fulfilled, (state, action) => {
      return [...state, action.payload];
    });
    builder.addCase(patchContactInfo.fulfilled, (state, action) => {
      return state.map((contactInfo) =>
        contactInfo._id === action.payload._id ? action.payload : contactInfo
      );
    });
    builder.addCase(deleteContactInfo.fulfilled, (state, action) => {
      return state.filter((contactInfo) => contactInfo._id !== action.payload._id);
    });
  },
});

export { getContactInfos, postContactInfo, patchContactInfo, deleteContactInfo };
export default contactInfoSlice.reducer;
