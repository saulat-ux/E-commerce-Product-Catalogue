import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import FooterLinks from "./components/footer/FooterLinks";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductDetail from "./pages/productDetail/ProductDetail";
import Shop from "./pages/shop/Shop";
import Cart from "./pages/cart/Cart";
import { loadUser } from "./redux/features/auth/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./components/Protectedroutes/ProtectedRoutes";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  axios.defaults.withCredentials = true;
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/login"
            element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <ProtectedRoute>
                <Register />
              </ProtectedRoute>
            }
          />
          <Route path="/product-details/:id" element={<ProductDetail />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <FooterLinks />
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
