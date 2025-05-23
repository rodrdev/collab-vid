import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import EditUser from "../pages/Configs";
import ForgotPassword from "../pages/ForgotPassword";
import Influencer from "../pages/Influencer";

const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password/:token" element={<ForgotPassword />} />
        <Route path="/configuracoes" element={<EditUser />} />
        <Route path="/:id/:channelName" element={<Influencer />} />
      </Routes>
    </Router>
  );
};

export default Routers;
