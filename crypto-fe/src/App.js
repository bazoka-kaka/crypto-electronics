import { useState, useEffect } from "react";
import axios, { axiosPrivate } from "./api/axios";
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
import About from "./pages/About";

const ROLES_LIST = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

const NOTIF_LIST = {
  Offers: 2000,
  Payment: 2001,
  Updates: 2002,
};

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    if (selectedTags?.length) {
      setFilteredProducts([]);
      products?.forEach((product) => {
        let found = true;
        const tags = product?.tags?.split(",");
        selectedTags?.forEach((tag) => {
          if (!tags?.includes(tag)) {
            found = false;
          }
        });
        if (found) setFilteredProducts((prev) => [...prev, product]);
      });
    } else {
      setFilteredProducts(products);
    }
  }, [selectedTags, products]);

  useEffect(() => {
    products?.forEach((product) => {
      const tmpTags = product.tags.split(",");
      tmpTags.forEach((tag) => {
        const found = tags?.includes(tag);
        if (!found) {
          setTags([...tags, tag]);
        }
      });
    });
  }, [products, tags]);

  const getProducts = async () => {
    try {
      const response = await axios.get("/products");

      setProducts(response?.data);
    } catch (err) {
      console.error(err?.message);
    }
  };

  const createNotifications = async (
    userId,
    title,
    description,
    link,
    type
  ) => {
    try {
      const response = await axiosPrivate.post(
        "/notifications",
        JSON.stringify({ userId, title, description, link, type })
      );
      console.log(response?.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Routes>
      <Route element={<ScrollToTop />}>
        <Route element={<PersistLogin />}>
          {/* unprotected */}
          <Route path="/" element={<UnprotectedLayout />}>
            <Route
              path="/"
              element={
                <Home
                  products={products}
                  tags={tags}
                  setSelectedTags={setSelectedTags}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route
              path="/products"
              element={
                <Products
                  products={filteredProducts}
                  tags={tags}
                  selectedTags={selectedTags}
                  setSelectedTags={setSelectedTags}
                />
              }
            />
            <Route
              path="/products/:id"
              element={
                <Product
                  createNotifications={createNotifications}
                  getProducts={getProducts}
                  products={products}
                  NOTIF_LIST={NOTIF_LIST}
                />
              }
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
              <Route
                path="/dashboard/cart"
                element={<Cart createNotifications={createNotifications} />}
              />
              <Route path="/dashboard/security" element={<Security />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
