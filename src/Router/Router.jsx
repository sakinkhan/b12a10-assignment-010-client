import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import Loading from "../components/Loading";
import AllProperties from "../pages/AllProperties/AllProperties";
import AddProperties from "../pages/AddProperties";
import MyProperties from "../pages/MyProperties";
import MyRatings from "../pages/MyRatings";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRoute from "../provider/PrivateRoute";
import PropertyDetails from "../pages/PropertyDetails/PropertyDetails";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../pages/DashboardHome/DashboardHome";
import OurAgents from "../pages/OurAgents";

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
        loader: () =>
          fetch("https://b12a10-homenest-api-server.vercel.app/properties"),
        element: <AllProperties></AllProperties>,
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/propertyDetails/:id",
        element: (
          <PrivateRoute>
            <PropertyDetails></PropertyDetails>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(
            `https://b12a10-homenest-api-server.vercel.app/properties/${params.id}`
          ),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/our-agents",
        element: <OurAgents></OurAgents>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome></DashboardHome>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "add-property",
        element: <AddProperties></AddProperties>,
      },
      {
        path: "my-properties",
        element: <MyProperties></MyProperties>,
      },
      {
        path: "my-ratings",
        element: <MyRatings></MyRatings>,
      },
    ],
  },
]);

export default router;
