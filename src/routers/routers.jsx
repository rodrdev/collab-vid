import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import EditUser from "../pages/Configs";
import ForgotPassword from "../pages/ForgotPassword";
import Influencer from "../pages/influencer";
const Routers = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id/:channelName" element={<Influencer />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reset-password/:token" element={<ForgotPassword />} />
        <Route path="/configuracoes" element={<EditUser />} />
      </Routes>
    </Router>
  );
};

export default Routers;
