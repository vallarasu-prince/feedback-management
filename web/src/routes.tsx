import { useRoutes } from "react-router-dom";
import FeedbackBoard from "./pages/home";
import FeebackView from "./pages/feebackView";
import Register from "./pages/auth/register";
import Login from "./pages/auth/login";
import ErrorPage from "./pages/404";

const Routes = () => {
  return useRoutes([
    {
      path: "/",
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "", element: <FeedbackBoard /> },
        { path: "feedback/view/:id", element: <FeebackView /> },
        { path: "*", element: <ErrorPage /> },
      ],
    },
  ]);
};

export default Routes;
