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
const postContact = createAsyncThunk("contact/postContact", async ({ data }) => {
  const res = await resourceApi.postResource({ resource: "contact", data });
  return res.data;
});

const contactSlice = createSlice({
  name: "contact",
  initialState: [],
  reducers: {
    patchContact: (state, action) => {
      resourceApi.patchResource({ resource: "contact", ...action.payload });
      return state.map((contact) =>
        contact._id === action.payload.id
          ? { ...contact, _id: action.payload.id, ...action.payload.data }
          : contact
      );
    },
    deleteContact: (state, action) => {
      resourceApi.deleteResource({ resource: "contact", ...action.payload });
      return state.filter((contact) => contact._id !== action.payload.id);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getContacts.fulfilled, (state, action) => {
        const filter = [];
        return [...state, ...action.payload].filter((contact) => {
          if (!filter.includes(contact._id)) {
            filter.push(contact._id);
            return true;
          } else {
            return false;
          }
        });
      })
      .addCase(postContact.fulfilled, (state, action) => {
        return [...state, action.payload];
      });
  },
});

export { getContacts, postContact };
export const { patchContact, deleteContact } = contactSlice.actions;
export default contactSlice.reducer;
