import { useState } from "react";
import PropTypes from "prop-types";

function EditableRecipeRow({
  recipe,
  updateRecipeMutation,
  deleteRecipeMutation,
}) {
  const [title, setTitle] = useState(recipe.title || "");
  const [ingredients, setIngredients] = useState(
    Array.isArray(recipe.ingredients)
      ? recipe.ingredients.join(", ")
      : recipe.ingredients || "",
  );
  const [imageUrl, setImageUrl] = useState(recipe.imageUrl || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFields = {
      title,
      ingredients: ingredients
        .split(",")
        .map((i) => i.trim())
        .filter(Boolean),
      imageUrl,
    };
    updateRecipeMutation.mutate({ id: recipe._id, updatedFields });
  };

  const handleDelete = () => {
    deleteRecipeMutation.mutate({ id: recipe._id });
  };

  return (
    <form onSubmit={handleSubmit} aria-labelledby={`recipe-edit-${recipe._id}`}>
      <div id={`recipe-edit-${recipe._id}`}>Edit Recipe</div>
      <div />
      <label htmlFor={`${recipe._id}-id`}>ID</label>
      <input id={`${recipe._id}-id`} value={recipe._id} readOnly />
      <label htmlFor={`${recipe._id}-title`}>Title</label>
      <input
        id={`${recipe._id}-title`}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <label htmlFor={`${recipe._id}-ingredients`}>
        Ingredients (comma separated)
      </label>
      <input
        id={`${recipe._id}-ingredients`}
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <label htmlFor={`${recipe._id}-image`}>Image URL</label>
      <input
        id={`${recipe._id}-image`}
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <div>
        <button type="submit" disabled={updateRecipeMutation.isLoading}>
          {updateRecipeMutation.isLoading ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={handleDelete}
          disabled={deleteRecipeMutation?.isLoading}
        >
          {deleteRecipeMutation?.isLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </form>
  );
}

EditableRecipeRow.propTypes = {
  recipe: PropTypes.object.isRequired,
  updateRecipeMutation: PropTypes.object.isRequired,
  deleteRecipeMutation: PropTypes.object.isRequired,
};

export default EditableRecipeRow;
