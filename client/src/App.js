import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import "../src/styles/style.css";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";
import Search from "./pages/search/Search";

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
        <Route
          path="/profile/:userID/"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/messenger"
          element={user ? <Messenger /> : <Navigate to="/" />}
        />
        <Route
          path="/search/:username"
          element={user ? <Search /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}
