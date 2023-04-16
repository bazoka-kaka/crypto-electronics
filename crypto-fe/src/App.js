import { useState, useEffect } from "react";
import axios from "./api/axios";
import PersistLogin from "./components/PersistLogin";
import Register from "./pages/Register";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";
import UnprotectedLayout from "./components/UnprotectedLayout";
import ProtectedLayout from "./components/ProtectedLayout";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products/Products";
import Product from "./pages/Products/Product";
import Account from "./pages/Dashboard/Account";
import Cart from "./pages/Dashboard/Cart";
import Security from "./pages/Dashboard/Security";
import RequireAuth from "./components/RequireAuth";
import Notifications from "./pages/Notifications";

const ROLES_LIST = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getProducts = async () => {
      try {
        const response = await axios.get("/products", {
          signal: controller.signal,
        });
        isMounted && setProducts(response?.data);
      } catch (err) {
        console.error(err?.message);
      }
    };

    getProducts();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <Routes>
      <Route element={<ScrollToTop />}>
        <Route element={<PersistLogin />}>
          {/* unprotected */}
          <Route path="/" element={<UnprotectedLayout />}>
            <Route path="/" element={<Home products={products} />} />
            <Route
              path="/products"
              element={<Products products={products} />}
            />
            <Route
              path="/products/:id"
              element={<Product products={products} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/401" element={<Unauthorized />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/*" element={<Navigate to="/404" />} />
          </Route>

          {/* protected */}
          <Route
            element={
              <RequireAuth
                allowedRoles={[
                  ROLES_LIST.Admin,
                  ROLES_LIST.Editor,
                  ROLES_LIST.User,
                ]}
              />
            }
          >
            <Route element={<UnprotectedLayout />}>
              <Route path="/notifications" element={<Notifications />} />
            </Route>
            <Route element={<ProtectedLayout />}>
              <Route path="/dashboard" element={<Account />} />
              <Route path="/dashboard/cart" element={<Cart />} />
              <Route path="/dashboard/security" element={<Security />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
