import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const flatsSlice = createSlice({
  name: "flats",
  initialState: {
    fetchedFlats: { loading: true, data: [], error: "" },
    liked: JSON.parse(localStorage.getItem("liked")) || [],
  },
  reducers: {
    addFlats: (state, action) => {
      state.fetchedFlats.data = action.payload;
    },
    toggleLiked: (state, action) => {
      const index = state.liked.indexOf(action.payload);
      if (state.liked.includes(action.payload) && index > -1) {
        state.liked = state.liked.filter((item) => item !== action.payload);
      } else {
        state.liked = [...state.liked, action.payload];
      }
    },
    setLoading: (state) => {
      state.fetchedFlats.loading = false;
    },
    setError: (state, { payload }) => {
      state.fetchedFlats.error = payload;
    },
  },
});
export const {
  addFlats,
  toggleLiked,
  setLoading,
  setError,
} = flatsSlice.actions;

export const fetchData = () => (dispatch) => {
  axios
    .get("entities.json")
    .then((res) => {
      dispatch(addFlats(res.data.response));
    })
    .catch(({ message }) => dispatch(setError(message)));
  dispatch(setLoading());
};

export const selectFetchedFlats = (redux) => redux.flats.fetchedFlats;
export const selectLiked = (redux) => redux.flats.liked;

export default flatsSlice.reducer;
