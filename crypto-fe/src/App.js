import { useState, useEffect } from "react";
import axios from "./api/axios";
import Register from "./pages/Register";
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";
import UnprotectedLayout from "./components/UnprotectedLayout";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products/Products";
import Product from "./pages/Products/Product";

// const ROLES = {
//   User: 2001,
//   Editor: 1984,
//   Admin: 5150,
// };

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
        {/* unprotected */}
        <Route path="/" element={<UnprotectedLayout />}>
          <Route path="/" element={<Home products={products} />} />
          <Route path="/products" element={<Products products={products} />} />
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
      </Route>
    </Routes>
  );
}

export default App;
