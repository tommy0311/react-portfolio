import $ from "jquery";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCurrentUser = createAsyncThunk(
  'user/fetchCurrentUser',
  async () => {
    return await $.ajax({
      url: `${process.env.REACT_APP_APISERVER_BASE_URL}/api/getCurrentUser`,
      type: 'get',
      dataType: 'json',
      headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
      cache: false,
      success: function (response) {
        return response
      },
      error: function (xhr, status, err) {
        return err
      },
    });
  }
)

export const userSlice = createSlice({
  name: "user",
  initialState: { payload: { updateTime: Date.now() }, isLogin: false },
  reducers: {
    userLogout: (state, action) => {
      state.payload = { updateTime: Date.now() };
      state.isLogin = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
      action.payload.updateTime = Date.now()
      state.payload = action.payload
      state.isLogin = true
    })
    builder.addCase(fetchCurrentUser.rejected, (state, action) => {
      state.payload = { updateTime: Date.now() };
      state.isLogin = false;
    })
  },
});

export const { userLogout } = userSlice.actions;
export default userSlice.reducer;