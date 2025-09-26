import { Recipe } from "../db/models/recipe.js";
import { User } from "../db/models/user.js";

export async function createRecipe(userId, { title, ingredients, imageUrl }) {
  const recipe = new Recipe({ title, ingredients, imageUrl, user: userId });
  return await recipe.save();
}

export async function listRecipes(
  query = {},
  { sortBy = "createdAt", sortOrder = "descending" } = {},
) {
  return await Recipe.find(query).sort({ [sortBy]: sortOrder });
}

export async function listAllRecipes(options) {
  return await listRecipes({}, options);
}

export async function listRecipesByUser(username, options) {
  const user = await User.findOne({ username });
  if (!user) return [];
  return await listRecipes({ user: user._id }, options);
}

export async function listRecipesByIngredient(ingredient, options) {
  return await listRecipes({ ingredients: ingredient }, options);
}

export async function getRecipeById(recipeId) {
  return await Recipe.findById(recipeId);
}

export async function updateRecipe(
  userId,
  recipeId,
  { title, ingredients, imageUrl },
) {
  return await Recipe.findOneAndUpdate(
    { _id: recipeId, user: userId },
    { $set: { title, ingredients, imageUrl } },
    { new: true },
  );
}

export async function deleteRecipe(userId, recipeId) {
  return await Recipe.deleteOne({ _id: recipeId, user: userId });
}
