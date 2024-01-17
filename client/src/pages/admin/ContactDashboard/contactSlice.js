import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { resourceApi } from "api";

const getContacts = createAsyncThunk("contact/getContacts", async ({ skip, limit }) => {
  const res = await resourceApi.getResources({
    resource: "contact",
    skip,
    limit,
    sort: "createdAt",
    order: "desc",
  });
  return res.data;
});
const deleteContact = createAsyncThunk("contact/deleteContact", async ({ id }) => {
  const res = await resourceApi.deleteResource({ resource: "contact", id });
  return res.data;
});

const contactSlice = createSlice({
  name: "contact",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(getContacts.fulfilled, (state, action) => {
      const filter = []; // Hold items' id
      state.forEach((contact) => filter.push(contact._id));
      action.payload.forEach((contact) => {
        if (!filter.includes(contact._id)) {
          state.push(contact);
        }
      });
      return state;
    });
    builder.addCase(deleteContact.fulfilled, (state, action) => {
      return state.filter((contact) => contact._id !== action.payload._id);
    });
  },
});

export { getContacts, deleteContact };
export default contactSlice.reducer;
