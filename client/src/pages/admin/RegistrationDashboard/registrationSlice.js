import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { registrationAPI } from "api";

const getRegistrations = createAsyncThunk("registration/getRegistrations", async ({ skip, limit }) => {
  const res = await registrationAPI.getRegistrations(skip, limit);
  return res.data;
});

const registrationSlice = createSlice({
  name: "registration",
  initialState: [],
  reducers: {
    setStatusRegistration: (state, action) => {
      registrationAPI.setStatusRegistration(action.payload.id, action.payload.status);
      return state.map((registration) =>
        registration._id === action.payload.id ? { ...registration, status: action.payload.status } : registration
      );
    },
    deleteRegistration: (state, action) => {
      registrationAPI.deleteRegistration(action.payload);
      return state.filter((registration) => registration._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getRegistrations.fulfilled, (state, action) => {
      const filter = [];
      return [...state, ...action.payload].filter((registration) => {
        if (!filter.includes(registration._id)) {
          filter.push(registration._id);
          return true;
        } else {
          return false;
        }
      });
    });
  },
});

export { getRegistrations };
export const { setStatusRegistration, deleteRegistration } = registrationSlice.actions;
export default registrationSlice.reducer;
