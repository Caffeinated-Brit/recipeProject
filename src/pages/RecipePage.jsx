import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function RecipePage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const res = await fetch(`${API_URL}/api/v1/recipes/${id}`);

        const data = await res.json();
        console.log(data);
        setRecipe(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [API_URL, id]);

  if (loading) return <div>Loading...</div>;
  if (!recipe) return <div>Recipe not found</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>{recipe.title}</h1>

      {recipe.imageUrl && (
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          style={{ width: "300px" }}
        />
      )}

      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <div style={{ marginTop: "20px", fontSize: "0.9rem", color: "#555" }}>
        <p>
          <strong>Author:</strong> {recipe.user}
        </p>
        <p>
          <strong>Likes:</strong> {recipe.likedBy.length}
        </p>
      </div>
    </div>
  );
}
