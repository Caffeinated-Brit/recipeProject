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
  // This is needed to do sorting like normal with createdAt and updatedAt
  const order = sortOrder === "ascending" ? 1 : -1;

  if (sortBy === "likes") {
    return Recipe.aggregate([
      { $match: query },
      {
        $addFields: {
          likesCount: { $size: { $ifNull: ["$likedBy", []] } },
        },
      },
      { $sort: { likesCount: order, createdAt: -1 } },
    ]);
  }

  return await Recipe.find(query).sort({ [sortBy]: order });
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

export async function addLike(recipeId, userId) {
  const updated = await Recipe.findByIdAndUpdate(
    recipeId,
    { $addToSet: { likedBy: userId } },
    { new: true },
  ).select("likedBy");
  if (!updated) return null;
  return updated.likedBy.length;
}

export async function removeLike(recipeId, userId) {
  const updated = await Recipe.findByIdAndUpdate(
    recipeId,
    { $pull: { likedBy: userId } },
    { new: true },
  ).select("likedBy");
  if (!updated) return null;
  return updated.likedBy.length;
}

export async function getTopRecipes(limit = 10) {
  const l = Math.min(parseInt(limit, 10) || 10, 100);
  return await Recipe.aggregate([
    {
      $project: {
        title: 1,
        ingredients: 1,
        imageUrl: 1,
        user: 1,
        createdAt: 1,
        likesCount: { $size: { $ifNull: ["$likedBy", []] } },
      },
    },
    { $sort: { likesCount: -1, createdAt: -1 } },
    { $limit: l },
  ]);
}
