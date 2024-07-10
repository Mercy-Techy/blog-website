import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./pages/Root";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthContextProvider } from "./store/AuthContext";
import Protected from "./components/Protected";
import BlogFormPage from "./pages/BlogFormPage";
import { queryClient } from "./Http";
import LogOut from "./pages/logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "signup", element: <SignUp /> },
      { path: "login", element: <Login /> },
      { path: "logout", element: <LogOut /> },
      { path: "about", element: <Protected element={About} /> },
      {
        path: "blogs",
        children: [
          { index: true, element: <Protected element={Blogs} /> },
          { path: ":_id", element: <Protected element={BlogDetails} /> },
          { path: "add", element: <Protected element={BlogFormPage} /> },
          { path: ":_id/edit", element: <Protected element={BlogFormPage} /> },
        ],
      },
    ],
  },
]);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </QueryClientProvider>
);

export default App;
