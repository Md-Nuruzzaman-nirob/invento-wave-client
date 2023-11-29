import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import HomePage from "../pages/home/HomePage";
import ErrorPage from "../pages/error/ErrorPage";
import CreateStorePage from "../pages/create-store/CreateStorePage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";
import DashboardLayout from "../layouts/DashboardLayout";
import SalesCollection from "../pages/dashboard/manager/SalesCollection";
import CheckOut from "../pages/dashboard/manager/checkout/CheckOut";
import AdminSaleSummery from "../pages/dashboard/admin/AdminSaleSummery";
import ShopSaleSummery from "../pages/dashboard/manager/ShopSaleSummery";
import PrivateRoute from "./PrivateRoute";
import ManageProduct from "../pages/dashboard/manager/manageProduct/ManageProduct";
import AddProduct from "../pages/dashboard/manager/manageProduct/AddProduct";
import UpdateProduct from "../pages/dashboard/manager/manageProduct/UpdateProduct";
import SubscriptionPayment from "../pages/dashboard/manager/subscription/SubscriptionPayment";
import PriceCheckout from "../pages/dashboard/manager/subscription/PriceCheckout";
import AdminRoute from "./AdminRoute";
import UnauthorizedErrorPage from "../pages/error/UnauthorizedErrorPage";
import AdminManageShop from "../pages/dashboard/admin/manageShop/AdminManageShop";
import ShopManagerRoute from "./ShopManagerRoute";
import ForbiddenErrorPage from "../pages/error/ForbiddenErrorPage";

const PageRoute = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: () => fetch("/pricing.json"),
      },
      {
        path: "create-shop",
        element: (
          <PrivateRoute>
            <CreateStorePage />
          </PrivateRoute>
        ),
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
        element: (
          <ShopManagerRoute>
            <ManageProduct />
          </ShopManagerRoute>
        ),
      },
      {
        path: "sales-Collection",
        element: (
          <ShopManagerRoute>
            <SalesCollection />
          </ShopManagerRoute>
        ),
      },
      {
        path: "shop-sale-summery",
        element: (
          <ShopManagerRoute>
            <ShopSaleSummery />
          </ShopManagerRoute>
        ),
      },
      {
        path: "subscription",
        element: (
          <ShopManagerRoute>
            <SubscriptionPayment />
          </ShopManagerRoute>
        ),
        loader: () => fetch("/pricing.json"),
      },
      {
        path: "manage-product/add-product",
        element: (
          <ShopManagerRoute>
            <AddProduct />
          </ShopManagerRoute>
        ),
      },
      {
        path: "sales-Collection/checkout/:id",
        element: (
          <ShopManagerRoute>
            {" "}
            <CheckOut />
          </ShopManagerRoute>
        ),
      },
      {
        path: "subscription/checkout/:plan",
        element: (
          <ShopManagerRoute>
            {" "}
            <PriceCheckout />
          </ShopManagerRoute>
        ),
        loader: () => fetch("/pricing.json"),
      },
      {
        path: "manage-product/update-product/:id",
        element: (
          <ShopManagerRoute>
            <UpdateProduct />
          </ShopManagerRoute>
        ),
      },

      // admin dashboard routes //
      {
        path: "manage-shop",
        element: (
          <AdminRoute>
            <AdminManageShop />
          </AdminRoute>
        ),
      },
      {
        path: "admin-sale-summery",
        element: (
          <AdminRoute>
            <AdminSaleSummery />
          </AdminRoute>
        ),
        loader: () => fetch("/pricing.json"),
      },
    ],
  },
  {
    path: "/error/unauthorized",
    element: <UnauthorizedErrorPage />,
  },
  {
    path: "/error/forbidden",
    element: <ForbiddenErrorPage />,
  },
]);

export default PageRoute;
