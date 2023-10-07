import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { eventAPI } from "api";

const getEvents = createAsyncThunk("event/getEvents", async () => {
  const res = await eventAPI.getEvents();
  return res.data;
});
const createEvent = createAsyncThunk("event/createEvent", async (data) => {
  const res = await eventAPI.createEvent(data);
  return res.data;
});

const eventSlice = createSlice({
  name: "event",
  initialState: [],
  reducers: {
    editEvent: (state, action) => {
      eventAPI.editEvent(action.payload.id, action.payload.data);
      return state.map((event) =>
        event._id === action.payload.id ? { _id: action.payload.id, ...action.payload.data } : event
      );
    },
    deleteEvent: (state, action) => {
      eventAPI.deleteEvent(action.payload);
      return state.filter((event) => event._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.fulfilled, (state, action) => {
        const filter = [];
        return [...state, ...action.payload].filter((event) => {
          if (!filter.includes(event._id)) {
            filter.push(event._id);
            return true;
          } else {
            return false;
          }
        });
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        return [...state, action.payload];
      });
  },
});

export { getEvents, createEvent };
export const { editEvent, deleteEvent } = eventSlice.actions;
export default eventSlice.reducer;
