import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import "../src/styles/style.css";
import Profile from "./pages/profile/Profile";
import Nav from "./components/navbar/Nav";

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}
