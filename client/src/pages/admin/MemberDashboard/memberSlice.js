import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { memberAPI } from "api";

const getMembers = createAsyncThunk("member/getMembers", async ({ skip, limit }) => {
  const res = await memberAPI.getMembers(skip, limit);
  return res.data;
});
const createMember = createAsyncThunk("member/createMember", async (data) => {
  const res = await memberAPI.createMember(data);
  return res.data;
});

const memberSlice = createSlice({
  name: "member",
  initialState: [],
  reducers: {
    editMember: (state, action) => {
      memberAPI.editMember(action.payload.id, action.payload.data);
      return state.map((member) =>
        member._id === action.payload.id
          ? { _id: action.payload.id, ...action.payload.data }
          : member
      );
    },
    deleteMember: (state, action) => {
      memberAPI.deleteMember(action.payload);
      return state.filter((member) => member._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMembers.fulfilled, (state, action) => {
        const filter = [];
        return [...state, ...action.payload].filter((member) => {
          if (!filter.includes(member._id)) {
            filter.push(member._id);
            return true;
          } else {
            return false;
          }
        });
      })
      .addCase(createMember.fulfilled, (state, action) => {
        return [...state, action.payload];
      });
  },
});

export { getMembers, createMember };
export const { editMember, deleteMember } = memberSlice.actions;
export default memberSlice.reducer;
