import React from "react";
import "./BeerCard.scss";

const BeerCard = ({ recipe, onRightClick, selected }) => {
  const handleCardRightClick = (e) => {
    e.preventDefault();
    onRightClick(recipe.id);
  };
  return (
    <div
      className={`beer__card ${selected ? "selected" : ""}`}
      onContextMenu={handleCardRightClick}
    >
      <div className="beer__body">
        <div className="beer__image">
          <img src={recipe.image_url} alt="" />
        </div>
        <div className="beer__content">
          <p className="beer__name">{recipe.name}</p>
          <p className="beer__tag">{recipe.tagline}</p>
          <p className="beer__description">{recipe.description}</p>
        </div>
      </div>
    </div>
  );
};

export default BeerCard;
