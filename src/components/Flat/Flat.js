import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLiked, toggleLiked } from "../../features/flats/flatsSlice";

const Flat = (props) => {
  const likedFlats = useSelector(selectLiked);
  const dispatch = useDispatch();

  const { title, rooms, area, unit } = props.flatData.attributes;

  const { city, street, house, room } = props.flatData.attributes.address;
  const address = `${city === "Tyumen" ? "Тюмень" : city}, ул. ${street},
   д. ${house}, кв. ${room}`;

  const agentInfo = props.flatData.relationships;
  const { first_name, last_name, middle_name } = agentInfo.attributes;

  return (
    <div className="Card">
      <div className="card-flat-info">
        <p>
          <small>
            {props.flatData.type === "flat" ? "квартира" : props.flatData.type}
          </small>
        </p>
        <strong>{title}</strong>
        <p>Комнат: {rooms}</p>
        <p>Адрес: {address}</p>
        <p>Площадь: {area + " " + unit}</p>
      </div>
      <hr />
      <div className="card-agent-info">
        <small>{agentInfo.type === "agent" ? "агент" : agentInfo.type}</small>
        <p>{last_name + " " + first_name + " " + middle_name}</p>
      </div>
      <hr />
      <div className="card-actions">
        <a
          href="/"
          onClick={(e) => {
            e.preventDefault();
            dispatch(toggleLiked(props.flatData.id));
          }}
        >
          {likedFlats.includes(props.flatData.id) ? (
            <span role="img" aria-label="blue-heart">
              💙 Убрать сердешко
            </span>
          ) : (
            <span role="img" aria-label="heart">
              ❤️ Нравится
            </span>
          )}
        </a>
      </div>
    </div>
  );
};
export default Flat;
