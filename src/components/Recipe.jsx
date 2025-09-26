import PropTypes from "prop-types";
import { User } from "./User.jsx";

export function Recipe({ title, ingredients, imageUrl, author }) {
  return (
    <article>
      <h3>{title}</h3>
      {imageUrl && (
        <div>
          <img src={imageUrl} alt={title} style={{ maxWidth: "300px" }} />
        </div>
      )}
      <div>
        <strong>Ingredients:</strong>{" "}
        {Array.isArray(ingredients) ? ingredients.join(", ") : ingredients}
      </div>
      {author && (
        <em>
          <br />
          Created by <User id={author} />
        </em>
      )}
    </article>
  );
}

Recipe.propTypes = {
  title: PropTypes.string.isRequired,
  ingredients: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.string,
  ]),
  imageUrl: PropTypes.string,
  author: PropTypes.string,
};
