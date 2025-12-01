import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HomePage } from "./pages/HomePage.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Login } from "./pages/Login.jsx";
import { AuthContextProvider } from "./contexts/AuthContext.jsx";
import { SocketProvider } from "./contexts/SocketProvider.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MyRecipes } from "./pages/MyRecipes.jsx";
import { RecipePage } from "./pages/RecipePage.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/myrecipes",
    element: <MyRecipes />,
  },
  {
    path: "/recipes/:id",
    element: <RecipePage />,
  },
]);

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <SocketProvider>
          <RouterProvider router={router} />
        </SocketProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}
