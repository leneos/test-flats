import React, { useEffect, useState } from "react";
import "./App.scss";
// import "./mygrid.css";
import { Card } from "./Card/Card";
// import localData from "./entities.json";
import Loader from "./Loader/Loader";

function App() {
  const initialLiked = () => JSON.parse(localStorage.getItem("liked")) || [];
  const [flats, setFlats] = useState("");
  const [liked, setLiked] = useState(initialLiked);
  useEffect(() => {
    try {
      fetch("entities.json", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFlats(data.response);
        });
    } catch (error) {
      console.log("Error: ", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("liked", JSON.stringify(liked));
  }, [liked]);

  const toggleLike = (e, id) => {
    const index = liked.indexOf(id);
    liked.includes(id)
      ? index > -1 && setLiked(liked.filter((item) => item !== id))
      : setLiked((prev) => [...prev, id]);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <h1>Тестовое задание</h1>

        <div className="row">
          {flats !== "" ? (
            flats.map((flat, index) => {
              return (
                <Card
                  key={index + Math.random()}
                  flatData={flat}
                  likedFlats={liked}
                  toggleLike={toggleLike}
                />
              );
            })
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
