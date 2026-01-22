import { Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./Pages/user/Login";
import Register from "./Pages/user/Register";
import AdminLogin from "./Pages/admin/AdminLogin";
import AdminRegister from "./Pages/admin/AdminRegister";
import Home from "./Pages/user/Home";
import Payment from "./Pages/user/Payment";
import UserProtectedWrapper from "./Pages/user/UserProtectedWrapper";
import ConfirmPayment from "./Pages/user/ConfirmPayment";
import UserLogout from "./Pages/user/UserLogout";
import AdminLogout from "./Pages/admin/AdminLogout";
import AdminHome from "./Pages/admin/AdminHome";
import AdminProtectedWrapper from "./Pages/user/UserProtectedWrapper";
import UserProfile from "./Pages/user/UserProfile";
import UserOrders from "./Pages/user/UserOrders";
import AdminProfile from "./Pages/admin/AdminProfile";
import CreateProduct from "./Pages/admin/CreateProduct";
import AllProducts from "./Pages/admin/AllProducts";
import AdminOrders from "./Pages/admin/AdminOrders";
import AllOrders from "./Pages/admin/AllOrders";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />
        <Route
          path="/logout"
          element={
            <UserProtectedWrapper>
              <UserLogout />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/home"
          element={
            <UserProtectedWrapper>
              <Home />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/confirm-payment"
          element={
            <UserProtectedWrapper>
              <ConfirmPayment />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/user-profile"
          element={
            <UserProtectedWrapper>
              <UserProfile />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/user-orders"
          element={
            <UserProtectedWrapper>
              <UserOrders />
            </UserProtectedWrapper>
          }
        />
        <Route
          path="/payment"
          element={
            <UserProtectedWrapper>
              <Payment />
            </UserProtectedWrapper>
          }
        />

        {/* Admin Routes */}

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/admin/logout" element={<AdminLogout />} />
        <Route
          path="/admin/admin-home"
          element={
            <AdminProtectedWrapper>
              <AdminHome />
            </AdminProtectedWrapper>
          }
        />
        <Route
          path="/admin/admin-profile"
          element={
            <AdminProtectedWrapper>
              <AdminProfile />
            </AdminProtectedWrapper>
          }
        />
        <Route
          path="/admin/create-product"
          element={
            <AdminProtectedWrapper>
              <CreateProduct />
            </AdminProtectedWrapper>
          }
        />
        <Route
          path="/admin/all-products"
          element={
            <AdminProtectedWrapper>
              <AllProducts />
            </AdminProtectedWrapper>
          }
        />
        <Route
          path="/admin/admin-orders"
          element={
            <AdminProtectedWrapper>
              <AdminOrders />
            </AdminProtectedWrapper>
          }
        />
         <Route
          path="/admin/all-orders"
          element={
            <AdminProtectedWrapper>
              <AllOrders />
            </AdminProtectedWrapper>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
