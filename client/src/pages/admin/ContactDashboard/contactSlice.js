import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { contactAPI } from "api";

const getContacts = createAsyncThunk("contact/getContacts", async ({ skip, limit }) => {
  const res = await contactAPI.getContacts(skip, limit);
  return res.data;
});

const contactSlice = createSlice({
  name: "contact",
  initialState: [],
  reducers: {
    setStatusContact: (state, action) => {
      contactAPI.setStatusContact(action.payload.id, action.payload.status);
      return state.map((contact) =>
        contact._id === action.payload.id ? { ...contact, status: action.payload.status } : contact
      );
    },
    deleteContact: (state, action) => {
      contactAPI.deleteContact(action.payload);
      return state.filter((contact) => contact._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getContacts.fulfilled, (state, action) => {
      const filter = [];
      return [...state, ...action.payload].filter((contact) => {
        if (!filter.includes(contact._id)) {
          filter.push(contact._id);
          return true;
        } else {
          return false;
        }
      });
    });
  },
});

export { getContacts };
export const { setStatusContact, deleteContact } = contactSlice.actions;
export default contactSlice.reducer;
