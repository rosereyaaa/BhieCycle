// import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from "./store";
import { ThemeProvider } from '@mui/material';
import { createTheme } from "@mui/material/styles";

//Components
import ProtectedRoute from "./components/route/ProtectedRoute";
import Home from "./components/Home";

//Components - Layouts 
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Register from './components/user/Register';

//Components - User
import Login from "./components/user/Login";
import Profile from "./components/user/Profile";
import UpdateProfile from './components/user/UpdateProfile';
import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

//Components - Admin
import Dashboard from './components/admin/Dashboard';
import UsersList from './components/admin/UsersList';
import NewUser from './components/admin/NewUser';
import UpdateUser from './components/admin/UpdateUser'
import Sidebar from './components/admin/Sidebar'
import OrdersList from "./components/admin/OrdersList";
import ProcessOrder from './components/admin/ProcessOrder';

//Components - Products 
import ProductsList from './components/admin/ProductsList';
import NewProduct from "./components/admin/NewProduct";
import UpdateProduct from './components/admin/UpdateProduct';

//Components - Services
import ServiceList from './components/admin/ServiceList'
import NewService from './components/admin/NewService';
import UpdateService from './components/admin/UpdateService';

//Actions
import { loadUser } from "./actions/userActions";

//Shopping Cart Product
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";
import ListOrders from "./components/order/ListOrders";
import OrderDetails from "./components/order/OrderDetails";
import ShopProduct from './components/ShopProduct';
import ProductDetails from "./components/product/ProductDetails";

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const { user, isAuthenticated, loading } = useSelector((state) => state.auth);
  const BhieCycle = createTheme({
    typography: {
      fontFamily: 'Montserrat'
    }
  });
  return (
    <div className="App">
      <ThemeProvider theme={BhieCycle}>
        {/* <Header /> */}
        {/* <Sidebar /> */}
        {/* <ToastContainer /> */}
        <Routes>

          {/* Routes for users */}
          <Route path="/register" element={<Register />} exact="true" />
          <Route path="/login" element={<Login />} exact="true" />
          <Route path="/" element={<Home />} exact="true" />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/update"
            element={
              <ProtectedRoute>
                <UpdateProfile />
              </ProtectedRoute>
            }
            exact="true"
          />
          <Route
            path="/password/update"
            element={
              <ProtectedRoute>
                <UpdatePassword />
              </ProtectedRoute>
            }
            exact="true"
          />
          <Route
            path="/password/forgot"
            element={<ForgotPassword />}
            exact="true"
          />
          <Route
            path="/password/reset/:token"
            element={<NewPassword />}
            exact="true"
          />

          {/* Routes for admin */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute isAdmin={true}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute isAdmin={true}>
                <UsersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users/new"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users/update/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <ProtectedRoute isAdmin={true}>
                <OrdersList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/order/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProcessOrder />
              </ProtectedRoute>
            }
          />

          {/* Routes for products */}
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute isAdmin={true}>
                <ProductsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/new"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update/product/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateProduct />
              </ProtectedRoute>
            }
          />

          {/* Routes for services */}
          <Route
            path="/services"
            element={
              <ProtectedRoute isAdmin={true}>
                <ServiceList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/service/new"
            element={
              <ProtectedRoute isAdmin={true}>
                <NewService />
              </ProtectedRoute>
            }
          />

          <Route
            path="/update/service/:id"
            element={
              <ProtectedRoute isAdmin={true}>
                <UpdateService />
              </ProtectedRoute>
            }
          />

          {/*  Routes for ordering products*/}
          <Route path="/ShopProduct/product/:id"
            element={
              <ProtectedRoute>
                <ProductDetails />
              </ProtectedRoute>
            }
            exact="true" />
          <Route path="/ShopProduct" element={<ShopProduct />} exact="true" />
          <Route path="/search/:keyword" element={<ShopProduct />} exact="true" />
          <Route path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
            exact="true" />
          <Route
            path="/shipping"
            element={
              <ProtectedRoute>
                <Shipping />
              </ProtectedRoute>
            }
            exact="true"
          />
          <Route
            path="/confirm"
            element={
              <ProtectedRoute>
                <ConfirmOrder />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/success"
            element={
              <ProtectedRoute>
                <OrderSuccess />
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders/me"
            element={
              <ProtectedRoute>
                <ListOrders />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order/:id"
            element={
              <ProtectedRoute>
                <OrderDetails />
              </ProtectedRoute>
            }
          />

        </Routes>
        <ToastContainer />
        {!loading && (!isAuthenticated || user.role !== "admin") && <Footer />}
        {/* </Header> */}
      </ThemeProvider>
    </div>
  );
}

export default App;