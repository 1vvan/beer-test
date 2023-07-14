import React, { useEffect, useState } from "react";
import "./RecipePage.scss";
import { Link, useParams } from "react-router-dom";
import useRecipeStore from "../../store/recipeStore";

const RecipePage = () => {
  const { id } = useParams();
  const recipes = useRecipeStore((state) => state.recipes);
  const [recipe, setRecipe] = useState();

  useEffect(() => {
    const choosedRecipe = recipes.find((recipe) => recipe.id === Number(id));

    if (choosedRecipe) {
      setRecipe(choosedRecipe);
    }
  }, [id, recipes]);
  return (
    <>
      {recipe ? (
        <div className="recipe">
          <Link className="return-btn" to={"/"}>
            Return
          </Link>
          <div className="recipe__container">
            <h1 className="recipe__page-title">
              More about beer "{recipe.name}" reciep
            </h1>
            <div className="recipe__body">
              <div className="recipe__image">
                <img src={recipe.image_url} alt="" />
              </div>
              <div className="recipe__content">
                <p className="recipe__tag">Tagline: {recipe.tagline}</p>
                <p className="recipe__description">
                  Description: {recipe.description}
                </p>
                <p className="recipe__first_brewed">
                  First brewed in: {recipe.first_brewed}
                </p>
                <p className="recipe__abv">ABV: {recipe.abv}%</p>
                <p className="recipe__ibu">IBU: {recipe.ibu}</p>
                <p>Contributed by: {recipe.contributed_by}</p>
              </div>
            </div>
            <div className="recipe__cooking">
              <div className="recipe__ingredients ingredients">
                <h2 className="ingredients__title">Ingredients:</h2>
                <ul>
                  {recipe?.ingredients.malt.map((ingredient) => (
                    <li key={ingredient.name}>
                      {ingredient.name} - {ingredient.amount.value}{" "}
                      {ingredient.amount.unit}
                    </li>
                  ))}
                  {recipe?.ingredients.hops.map((ingredient) => (
                    <li key={ingredient.name}>
                      {ingredient.name} - {ingredient.amount.value}{" "}
                      {ingredient.amount.unit} ({ingredient.add})
                    </li>
                  ))}
                  <li>Yeast: {recipe?.ingredients.yeast}</li>
                </ul>
              </div>

              <div className="reciepe__method method">
                <h2 className="method__title">Method:</h2>
                <p>
                  Mash Temp: {recipe?.method.mash_temp[0].temp.value}{" "}
                  {recipe?.method.mash_temp[0].temp.unit} for{" "}
                  {recipe?.method.mash_temp[0].duration} minutes
                </p>
                <p>
                  Fermentation Temp: {recipe?.method.fermentation.temp.value}{" "}
                  {recipe?.method.fermentation.temp.unit}
                </p>
                <h2 className="method__title">Food Pairing:</h2>
                <ul>
                  {recipe?.food_pairing.map((food) => (
                    <li key={food}>{food}</li>
                  ))}
                </ul>
                <h2 className="method__title">Brewers Tips:</h2>
                <p>{recipe?.brewers_tips}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </>
  );
};

export default RecipePage;
