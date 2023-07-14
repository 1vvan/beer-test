import React, { useEffect, useRef } from "react";
import BeerCard from "../BeerCard/BeerCard";
import useRecipeStore from "../../store/recipeStore";
import "./MainPage.scss";
import { Link } from "react-router-dom";

const MainPage = () => {
  const recipes = useRecipeStore((state) => state.recipes);
  const fetchRecipes = useRecipeStore((state) => state.fetchRecipes);
  const loadMoreRecipes = useRecipeStore((state) => state.loadMoreRecipes);
  const containerRef = useRef(null);
  const selectedRecipes = useRecipeStore((state) => state.selectedRecipes);
  const toggleRecipeSelection = useRecipeStore(
    (state) => state.toggleRecipeSelection
  );
  const deleteSelectedRecipes = useRecipeStore(
    (state) => state.deleteSelectedRecipes
  );

  useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line
  }, []);

  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      const { scrollTop, clientHeight, scrollHeight } = container;
      if (scrollTop + clientHeight === scrollHeight) {
        loadMoreRecipes();
        console.log(recipes);
      }
    }
  };

  const handleRecipeRightClick = (recipeId) => {
    toggleRecipeSelection(recipeId);
  };

  const handleDeleteButtonClick = () => {
    deleteSelectedRecipes();
  };

  return (
    <div className="beer">
      <div className="beer__list" ref={containerRef} onScroll={handleScroll}>
        {recipes &&
          recipes
            .slice(-15)
                  .map((recipe) => (
                <Link to={`/recipes/${recipe.id}`} key={recipe.id}>
                    <BeerCard
                      recipe={recipe}
                      onRightClick={handleRecipeRightClick}
                      selected={selectedRecipes.includes(recipe.id)}
                    />
                </Link>
            ))}
      </div>
      {selectedRecipes.length > 0 && (
        <button className="delete-btn" onClick={handleDeleteButtonClick}>
          Delete
        </button>
      )}
    </div>
  );
};

export default MainPage;
