import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  fetchData,
  selectFetchedFlats,
  selectLiked,
} from "../../features/flats/flatsSlice";

import Loader from "../Loader/Loader";
import Flat from "../Flat/Flat";

export const Flats = () => {
  const { loading, data, error } = useSelector(selectFetchedFlats);
  const liked = useSelector(selectLiked);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("liked", JSON.stringify(liked));
  }, [liked]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;
  if (!loading && !error) {
    return data.map((flat, index) => {
      return <Flat key={index + flat.id} flatData={flat} likedFlats={liked} />;
    });
  }
};
