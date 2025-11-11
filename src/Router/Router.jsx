import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Loading from "../components/Loading";
import AllProperties from "../pages/AllProperties";
import AddProperties from "../pages/AddProperties";
import MyProperties from "../pages/MyProperties";
import MyRatings from "../pages/MyRatings";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../provider/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        index: true,
        element: <Home></Home>,
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/allProperties",
        element: <AllProperties></AllProperties>,
      },
      {
        path: "/addProperties",
        element: (
          <PrivateRoute>
            <AddProperties></AddProperties>
          </PrivateRoute>
        ),
      },
      {
        path: "/myProperties",
        element: (
          <PrivateRoute>
            <MyProperties></MyProperties>
          </PrivateRoute>
        ),
      },
      {
        path: "/myRatings",
        element: (
          <PrivateRoute>
            <MyRatings></MyRatings>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
