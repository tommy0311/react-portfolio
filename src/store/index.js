import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from "./slice/resume";
import modalReducer from "./slice/modal";

export default configureStore({
  reducer: {
    resume: resumeReducer,
    modal: modalReducer
  },
});
