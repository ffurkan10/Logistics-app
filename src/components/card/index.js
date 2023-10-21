import React from "react";
import Style from "./style.module.scss";

const Card = ({ il, ilce, km, tur, firstIcon, secondIcon, sil, edit, id }) => {
  const handleEditClick = () => {
    sessionStorage.setItem("editedItemId", id);
    sessionStorage.setItem("editedItemIl", il);
    sessionStorage.setItem("editedItemIlce", ilce);
    sessionStorage.setItem("editedItemKm", km);
    sessionStorage.setItem("editedItemTur", tur);

    edit(id);
  };

  return (
    <div className={Style.card}>
      <div className={Style.left}>
        <p>{il}</p>
        <p>{ilce}</p>
        <p>{km}</p>
        <p>{tur}</p>
      </div>
      <div className={Style.right}>
        <button onClick={handleEditClick}>{firstIcon}</button>
        <button onClick={() => sil(id)}>{secondIcon}</button>
      </div>
    </div>
  );
};

export default Card;
