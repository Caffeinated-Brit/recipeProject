import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { User } from "./User.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useSocket } from "../contexts/useSocket.js";

export function Header() {
  const [token, setToken] = useAuth();
  const socket = useSocket();
  const [notification, setNotification] = useState(null); // store recipe info

  useEffect(() => {
    if (!socket) return;

    const handleNewRecipe = (recipe) => {
      // recipe should contain at least { id, title }
      setNotification(recipe);

      // auto-hide after 6 seconds
      setTimeout(() => setNotification(null), 6000);
    };

    socket.on("newRecipe", handleNewRecipe);
    return () => socket.off("newRecipe", handleNewRecipe);
  }, [socket]);

  const renderNotification = () => {
    if (!notification) return null;

    return (
      <div className="notification">
        <Link to={`/recipes/${notification.id}`}>
          New recipe added: {notification.title}
        </Link>
      </div>
    );
  };

  if (token) {
    const { sub } = jwtDecode(token);
    return (
      <div>
        <div>
          Logged in as <User id={sub} />
          <br />
          <button onClick={() => setToken(null)}>Logout</button>
        </div>
        <div>
          <Link to="/myrecipes">My Recipes</Link>
        </div>
        {renderNotification()}
      </div>
    );
  }

  return (
    <div>
      <Link to="/login">Log In</Link> | <Link to="/signup">Sign up</Link>
      {renderNotification()}
    </div>
  );
}
