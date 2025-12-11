import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import MyProfile from "../Pages/DashBoard/MyProfile/MyProfile";
import AllScholarships from "../Pages/Scholarships/AllScholarships/AllScholarships";
import AddScholarShip from "../Pages/DashBoard/AddScholarShip/AddScholarShip";
import ManageScholarships from "../Pages/DashBoard/ManageScholarships/ManageScholarships";
import EditScholarship from "../Pages/DashBoard/ManageScholarships/EditScholarship";
import ScholarShipDetails from "../Components/ScholarShipDetails/ScholarShipDetails";
import Payment from "../Pages/Payments/Payment";
import PaymentSuccess from "../Pages/Payments/PaymentSuccess";
import PaymentFailed from "../Pages/Payments/PaymentFailed";
import MyApplications from "../Pages/DashBoard/MyApplications/MyApplications";
import MyReviews from "../Pages/DashBoard/MyReviews/MyReviews";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/scholarships",
        Component: AllScholarships,
        // loader: () => fetch("/scholarship.json").then((res) => res.json()),
      },
      {
        path: "/scholarships/:id",
        Component: ScholarShipDetails,
      },
      {
        path: "/payment/:id",
        Component: Payment,
      },
      {
        path: "/payment-success",
        Component: PaymentSuccess,
      },
      {
        path: "/payment-failed",
        Component: PaymentFailed,
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/login",
        Component: Login,
      },
      {
        path: "/auth/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "add-scholarship",
        Component: AddScholarShip,
      },
      {
        path: "manage-scholarship",
        Component: ManageScholarships,
      },
      {
        path: "edit-scholarship/:id",
        Component: EditScholarship,
      },
      {
        path: "my-applications",
        Component: MyApplications,
      },
      {
        path: "my-reviews",
        Component: MyReviews,
      },
    ],
  },
]);
export default router;
