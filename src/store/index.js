import { configureStore } from "@reduxjs/toolkit";
import resumeReducer from "./slice/resume";
import modalReducer from "./slice/modal";
import userReducer from "./slice/user";


export default configureStore({
  reducer: {
    resume: resumeReducer,
    modal: modalReducer,
    user: userReducer
  },
});
