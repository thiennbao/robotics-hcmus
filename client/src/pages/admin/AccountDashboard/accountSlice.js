import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "api";

const getAccountList = createAsyncThunk("account/getAccountList", async ({ skip, limit }) => {
  const res = await authApi.getAccountList({
    skip,
    limit,
    sort: "createdAt",
    order: "desc",
  });
  return res.data;
});
const register = createAsyncThunk("account/register", async ({ data }) => {
  const res = await authApi.register({ data });
  return res.data;
});
const changePassword = createAsyncThunk("account/changePassword", async ({ id, data }) => {
  const res = await authApi.changePassword({ id, data });
  return res.data;
});
const deleteAccount = createAsyncThunk("account/deleteAccount", async ({ id }) => {
  const res = await authApi.deleteAccount({ id });
  return res.data;
});

const accountSlice = createSlice({
  name: "account",
  initialState: [],
  extraReducers: (builder) => {
    builder.addCase(getAccountList.fulfilled, (state, action) => {
      const filter = []; // Hold items' id
      state.forEach((account) => filter.push(account._id));
      action.payload.forEach((account) => {
        if (!filter.includes(account._id)) {
          state.push(account);
        }
      });
      return state;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      return [...state, action.payload];
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      return state.map((account) =>
        account._id === action.payload._id ? action.payload : account
      );
    });
    builder.addCase(deleteAccount.fulfilled, (state, action) => {
      return state.filter((account) => account._id !== action.payload._id);
    });
  },
});

export { getAccountList, register, changePassword, deleteAccount };
export default accountSlice.reducer;
