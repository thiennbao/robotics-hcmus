import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { applicationAPI } from "api";

const getApplications = createAsyncThunk("application/getApplications", async ({ skip, limit }) => {
  const res = await applicationAPI.getApplications(skip, limit);
  return res.data;
});

const applicationSlice = createSlice({
  name: "application",
  initialState: [],
  reducers: {
    setStatusApplication: (state, action) => {
      applicationAPI.setStatusApplication(action.payload.id, action.payload.status);
      return state.map((application) =>
        application._id === action.payload.id ? { ...application, status: action.payload.status } : application
      );
    },
    deleteApplication: (state, action) => {
      applicationAPI.deleteApplication(action.payload);
      return state.filter((application) => application._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getApplications.fulfilled, (state, action) => {
      const filter = [];
      return [...state, ...action.payload].filter((application) => {
        if (!filter.includes(application._id)) {
          filter.push(application._id);
          return true;
        } else {
          return false;
        }
      });
    });
  },
});

export { getApplications };
export const { setStatusApplication, deleteApplication } = applicationSlice.actions;
export default applicationSlice.reducer;
