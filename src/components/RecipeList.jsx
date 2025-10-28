import { Fragment } from "react";
import PropTypes from "prop-types";
import { Recipe } from "./Recipe.jsx";

export function RecipeList({ recipes = [], userId, token }) {
  return (
    <div>
      {recipes.map((recipe) => (
        <Fragment key={recipe._id || recipe.id}>
          <Recipe {...recipe} userId={userId} token={token} />
          <hr />
        </Fragment>
      ))}
    </div>
  );
}

RecipeList.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.shape(Recipe.propTypes)).isRequired,
  userId: PropTypes.string,
  token: PropTypes.string,
};
