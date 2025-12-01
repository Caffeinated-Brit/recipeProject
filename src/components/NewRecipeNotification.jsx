import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSocket } from "../contexts/useSocket.js"; // update to your actual path

export default function RecipeNotification() {
  const socket = useSocket();
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (!socket) return;

    const handleNewRecipe = (recipe) => {
      setNotification(recipe);
      setTimeout(() => setNotification(null), 6000);
    };

    socket.on("newRecipe", handleNewRecipe);

    return () => socket.off("newRecipe", handleNewRecipe);
  }, [socket]);

  if (!notification) return null;

  return (
    <div className="notification">
      <Link to={`/recipes/${notification.id}`}>
        New recipe added: {notification.title}
      </Link>
    </div>
  );
}
