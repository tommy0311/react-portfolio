import $ from "jquery";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchResumeById = createAsyncThunk(
  'resume/fetchResumeById',
  async (resumeId) => {
    return await $.ajax({
      url: `${process.env.REACT_APP_APISERVER_BASE_URL}/api/resumes/${resumeId}`,
      dataType: "json",
      cache: false,
      success: function (response) {
        return response.body
      },
      error: function (xhr, status, err) {
        throw err
      },
    });
  }
)

export const resumeSlice = createSlice({
  name: "resume",
  initialState: { payload: null },
  reducers: {
    updateResume: (state, action) => {
      state.payload = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchResumeById.fulfilled, (state, action) => {
      state.payload = action.payload
    })
  },
});

export const { updateResume } = resumeSlice.actions;
export default resumeSlice.reducer;