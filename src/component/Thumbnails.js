import React from "react";

const Pokemonthumnails = ({ id, name, image, type, onClick }) => {
  const style = `thumb-container ${type}`;
  return (
    <div className={style} onClick={onClick} style={{ cursor: "pointer" }} role="button" tabIndex={0} onKeyDown={onClick}>
      <div className="number">
        <small>#{id.toString().padStart(3, '0')}</small>
      </div>
      <img src={image} alt={`${name} thumbnail`} />
      <div className="detail-wrapper">
        <h3>{name}</h3>
        <small>Type: {type}</small>
      </div>
    </div>
  );
};

export default Pokemonthumnails;
