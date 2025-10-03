import PropTypes from "prop-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRecipe, deleteRecipe } from "../api/recipes.js";
import EditableRecipeRow from "./EditableRecipe.jsx";

export function EditableRecipeList({ recipes, token }) {
  const queryClient = useQueryClient();

  const updateRecipeMutation = useMutation({
    mutationFn: ({ id, updatedFields }) =>
      updateRecipe(token, id, updatedFields),
    onSuccess: () => queryClient.invalidateQueries(["recipes"]),
  });

  const deleteRecipeMutation = useMutation({
    mutationFn: ({ id }) => deleteRecipe(token, id),
    onSuccess: () => queryClient.invalidateQueries(["recipes"]),
  });

  return (
    <div>
      {recipes.map((recipe) => (
        <EditableRecipeRow
          key={recipe._id}
          recipe={recipe}
          updateRecipeMutation={updateRecipeMutation}
          deleteRecipeMutation={deleteRecipeMutation}
        />
      ))}
    </div>
  );
}

EditableRecipeList.propTypes = {
  recipes: PropTypes.array.isRequired,
  token: PropTypes.string.isRequired,
};
