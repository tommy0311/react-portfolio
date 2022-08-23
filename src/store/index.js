import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from "./slice/resume";

export default configureStore({
  reducer: {
    resume: resumeReducer,
  },
});
