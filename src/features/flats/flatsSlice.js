import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const flatsSlice = createSlice({
  name: "flats",
  initialState: {
    fetchedFlats: [],
    liked:
      JSON.parse(localStorage.getItem("liked")) ||
      localStorage.setItem("liked", "[]"),
  },
  reducers: {
    addFlats: (state, action) => {
      state.fetchedFlats = action.payload;
    },
    toggleLiked: (state, action) => {
      const index = state.liked.indexOf(action.payload);
      if (state.liked.includes(action.payload) && index > -1) {
        state.liked = state.liked.filter((item) => item !== action.payload);
      } else {
        state.liked = [...state.liked, action.payload];
      }
    },
  },
});
export const { addFlats, toggleLiked } = flatsSlice.actions;

export const fetchData = () => (dispatch) => {
  axios.get("entities.json").then((res) => {
    dispatch(addFlats(res.data.response));
  });
};

export const selectFetchedFlats = (redux) => redux.flats.fetchedFlats;
export const selectLiked = (redux) => redux.flats.liked;

export default flatsSlice.reducer;
