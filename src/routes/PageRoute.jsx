import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/home/HomePage";
import ErrorPage from "../pages/error/ErrorPage";
import CreateStorePage from "../pages/create-store/CreateStorePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import DashboardLayout from "../layouts/DashboardLayout";
import SubscriptionPayment from "../pages/dashboard/manager/SubscriptionPayment";
import SalesCollection from "../pages/dashboard/manager/SalesCollection";
import CheckOut from "../pages/dashboard/manager/CheckOut";
import AdminManageShop from "../pages/dashboard/admin/AdminManageShop";
import AdminSaleSummery from "../pages/dashboard/admin/AdminSaleSummery";
import ShopSaleSummery from "../pages/dashboard/manager/ShopSaleSummery";
import AdminManageUser from "../pages/dashboard/admin/AdminManageUser";
import PrivateRoute from "./PrivateRoute";
import ManageProduct from "../pages/dashboard/manager/manageProduct/ManageProduct";
import AddProduct from "../pages/dashboard/manager/manageProduct/AddProduct";
import UpdateProduct from "../pages/dashboard/manager/manageProduct/UpdateProduct";

const PageRoute = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "create-store",
        element: <CreateStorePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // manager dashboard routes //
      {
        path: "manage-product",
        element: <ManageProduct />,
      },
      {
        path: "sales-Collection",
        element: <SalesCollection />,
      },
      {
        path: "checkout",
        element: <CheckOut />,
      },
      {
        path: "shop-sale-summery",
        element: <ShopSaleSummery />,
      },
      {
        path: "subscription",
        element: <SubscriptionPayment />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "update-product/:id",
        element: <UpdateProduct />,
      },

      // admin dashboard routes //
      {
        path: "manage-shop",
        element: <AdminManageShop />,
      },
      {
        path: "manage-user",
        element: <AdminManageUser />,
      },
      {
        path: "admin-sale-summery",
        element: <AdminSaleSummery />,
      },
    ],
  },
]);

export default PageRoute;
