import { configureStore } from "@reduxjs/toolkit";
import formSlice from "../features/formSlice";
import logger from "redux-logger";

export default configureStore({
  reducer: {
    formState: formSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
