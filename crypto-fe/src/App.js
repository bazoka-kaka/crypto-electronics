import Register from "./pages/Register";
import Login from "./pages/Login";
import UnprotectedLayout from "./components/UnprotectedLayout";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      {/* unprotected */}
      <Route path="/" element={<UnprotectedLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
