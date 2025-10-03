import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../contexts/AuthContext.jsx";
import { getRecipes } from "../api/recipes.js";
import { getUserInfo } from "../api/users.js";
import { Header } from "../components/Header.jsx";
import { EditableRecipeList } from "../components/EditableRecipeList.jsx";

export function MyRecipes() {
  const [token] = useAuth();

  let author = null;
  try {
    author = token ? (jwtDecode(token)?.sub ?? null) : null;
  } catch {
    author = null;
  }

  const userQuery = useQuery({
    queryKey: ["user", author],
    queryFn: () => getUserInfo(author),
    enabled: Boolean(author),
  });

  const username = userQuery.data?.username ?? null;
  console.log(username);

  const recipesQuery = useQuery({
    queryKey: ["recipes", username],
    queryFn: () => getRecipes({ author: username }),
    enabled: Boolean(username),
  });

  const recipes = recipesQuery.data ?? [];
  console.log(recipes);

  if (!token) {
    return (
      <div>
        <Header />
        <div>Please log in to manage your recipes.</div>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <hr></hr>
      <EditableRecipeList recipes={recipes} token={token} />
      {recipesQuery.isLoading && <div>Loading...</div>}
      {recipesQuery.error && <div>Error loading recipes</div>}
    </div>
  );
}
