import { configureStore } from "@reduxjs/toolkit";
import flatsReducer from "../features/flats/flatsSlice";

export default configureStore({
  reducer: {
    flats: flatsReducer,
  },
});
