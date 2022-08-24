import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: "modal",
  initialState: { show: false, payload: null },
  reducers: {
    showModal: (state, action) => {
      state.show = true;
      state.payload = action.payload
    },
    hideModal: (state) => {
      state.show = false;
    },
  }
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;