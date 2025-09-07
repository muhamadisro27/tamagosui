import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Providers from "./providers";
import HomePage from "./pages/home";
import { Toaster } from "./components/ui/sonner";
import GuildPage from "./pages/guild";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/guild",
    element: <GuildPage />,
  },
]);

function App() {
  return (
    <Providers>
      <RouterProvider router={router} />
      <Toaster />
    </Providers>
  );
}

export default App;
