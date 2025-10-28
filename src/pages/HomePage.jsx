import { CreateRecipe } from "../components/CreateRecipe.jsx";
import { RecipeList } from "../components/RecipeList.jsx";
import { RecipeFilter } from "../components/RecipeFilter.jsx";
import { RecipeSorting } from "../components/RecipeSorting.jsx";
import { Header } from "../components/Header.jsx";
import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../api/recipes.js";
import { AuthContext } from "../contexts/AuthContext.jsx"; // Adjust path if needed

export function HomePage() {
  const [author, setAuthor] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("descending");

  const { userId, token } = useContext(AuthContext); // Retrieve from context

  const RecipesQuery = useQuery({
    queryKey: ["recipes", { author, sortBy, sortOrder }],
    queryFn: () => getRecipes({ author, sortBy, sortOrder }),
  });

  console.log(author);
  const Recipes = RecipesQuery.data ?? [];
  console.log(Recipes);

  return (
    <div style={{ padding: 8 }}>
      <h1>Welcome to some Recipes!</h1>
      <Header />
      <br />
      <hr />
      <CreateRecipe />
      <br />
      <hr />
      Filter by:
      <RecipeFilter
        field="author"
        value={author}
        onChange={(value) => setAuthor(value)}
      />
      <br />
      <RecipeSorting
        fields={["createdAt", "updatedAt"]}
        value={sortBy}
        onChange={(value) => setSortBy(value)}
        orderValue={sortOrder}
        onOrderChange={(orderValue) => setSortOrder(orderValue)}
      />
      <hr />
      <RecipeList recipes={Recipes} userId={userId} token={token} />
    </div>
  );
}
