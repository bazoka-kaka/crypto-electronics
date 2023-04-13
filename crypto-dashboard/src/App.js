import Login from "./pages/Login";
import Register from "./pages/Register";
import UnprotectedLayout from "./components/UnprotectedLayout";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route, Navigate } from "react-router-dom";
import Unauthorized from "./pages/Unauthorized";
import DashboardLayout from "./components/DashboardLayout";
import CreateUser from "./pages/users/Create";
import UpdateUser from "./pages/users/Update";
import Users from "./pages/users/Users";
import PersistLogin from "./components/PersistLogin";
import User from "./pages/users/User";
import Products from "./pages/products/Products";
import Product from "./pages/products/Product";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <Routes>
      <Route element={<UnprotectedLayout />}>
        {/* unprotected routes */}
        <Route path="/" element={<Navigate to="/products" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Route>

      <Route element={<DashboardLayout />}>
        {/* protected routes */}
        <Route element={<PersistLogin />}>
          {/* read */}
          <Route
            element={
              <RequireAuth
                allowedRoles={[ROLES.User, ROLES.Admin, ROLES.Editor]}
              />
            }
          ></Route>

          {/* create, update */}
          <Route
            element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Editor]} />}
          >
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<Product />} />
          </Route>

          {/* only for admins */}
          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/users/create" element={<CreateUser />} />
            <Route path="/users/update/:id" element={<UpdateUser />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
