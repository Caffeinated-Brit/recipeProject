import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { User } from "./User.jsx";
import { likeRecipe, unlikeRecipe } from "../api/recipes.js";

export function Recipe({
  title,
  ingredients,
  imageUrl,
  author,
  _id,
  likedBy = [],
  userId,
  token,
}) {
  const [likesCount, setLikesCount] = useState(likedBy.length);
  const [isLiked, setIsLiked] = useState(likedBy.includes(userId));

  useEffect(() => {
    setIsLiked(likedBy.includes(userId));
  }, [likedBy, userId]);

  const handleLike = async () => {
    try {
      if (isLiked) {
        await unlikeRecipe(token, _id);
        setLikesCount(likesCount - 1);
      } else {
        await likeRecipe(token, _id);
        setLikesCount(likesCount + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

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
      <button onClick={handleLike} disabled={!token}>
        {isLiked ? "Unlike" : "Like"} ({likesCount})
      </button>
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
  _id: PropTypes.string.isRequired,
  likedBy: PropTypes.arrayOf(PropTypes.string),
  userId: PropTypes.string,
  token: PropTypes.string,
};
