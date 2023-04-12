import Register from "./pages/Register";
import Login from "./pages/Login";
import UnprotectedLayout from "./components/UnprotectedLayout";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <Routes>
      {/* unprotected */}
      <Route path="/" element={<UnprotectedLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/401" element={<Unauthorized />} />
        <Route path="/404" element={<NotFound />} />
        <Route path="/*" element={<Navigate to="/404" />} />
      </Route>
    </Routes>
  );
}

export default App;
