import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { timelineAPI } from "api";

const getTimelines = createAsyncThunk("timeline/getTimelines", async ({ skip, limit }) => {
  const res = await timelineAPI.getTimelines(skip, limit);
  return res.data;
});
const createTimeline = createAsyncThunk("timeline/createTimeline", async (data) => {
  const res = await timelineAPI.createTimeline(data);
  return res.data;
});

const timelineSlice = createSlice({
  name: "timeline",
  initialState: [],
  reducers: {
    editTimeline: (state, action) => {
      timelineAPI.editTimeline(action.payload.id, action.payload.data);
      return state.map((timeline) =>
        timeline._id === action.payload.id
          ? { _id: action.payload.id, ...action.payload.data }
          : timeline
      );
    },
    deleteTimeline: (state, action) => {
      timelineAPI.deleteTimeline(action.payload);
      return state.filter((timeline) => timeline._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTimelines.fulfilled, (state, action) => {
        const filter = [];
        return [...state, ...action.payload].filter((timeline) => {
          if (!filter.includes(timeline._id)) {
            filter.push(timeline._id);
            return true;
          } else {
            return false;
          }
        });
      })
      .addCase(createTimeline.fulfilled, (state, action) => {
        return [...state, action.payload];
      });
  },
});

export { getTimelines, createTimeline };
export const { editTimeline, deleteTimeline } = timelineSlice.actions;
export default timelineSlice.reducer;
