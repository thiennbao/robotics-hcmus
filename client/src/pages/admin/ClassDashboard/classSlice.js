import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { classAPI } from "api";

const getClasses = createAsyncThunk("class/getClasses", async ({ skip, limit }) => {
  const res = await classAPI.getClasses(skip, limit);
  return res.data;
});
const createClass = createAsyncThunk("class/createClass", async (data) => {
  const res = await classAPI.createClass(data);
  return res.data;
});

const classSlice = createSlice({
  name: "class",
  initialState: [],
  reducers: {
    editClass: (state, action) => {
      classAPI.editClass(action.payload.id, action.payload.data);
      return state.map((item) =>
        item._id === action.payload.id
          ? { _id: action.payload.id, ...action.payload.data }
          : item
      );
    },
    deleteClass: (state, action) => {
      classAPI.deleteClass(action.payload);
      return state.filter((item) => item._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClasses.fulfilled, (state, action) => {
        const filter = [];
        return [...state, ...action.payload].filter((item) => {
          if (!filter.includes(item._id)) {
            filter.push(item._id);
            return true;
          } else {
            return false;
          }
        });
      })
      .addCase(createClass.fulfilled, (state, action) => {
        return [...state, action.payload];
      });
  },
});

export { getClasses, createClass };
export const { editClass, deleteClass } = classSlice.actions;
export default classSlice.reducer;
