import { configureStore } from "@reduxjs/toolkit";
import authreducer from "../slices/authSlice";
export const store = configureStore({
  reducer: {
    auth: authreducer
  }
})