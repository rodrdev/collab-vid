import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";

const ForgotPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();

  const passwordsMatch = formData.password === formData.confirmPassword;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!passwordsMatch) {
      setError("As senhas não coincidem.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        `https://collab-vid-back.onrender.com/users/reset-password/${token}`,
        formData
      );
      toast.success("Senha redefinida com sucesso!");
      setLoading(false);
      navigate("/login");
    } catch (err) {
      console.error("Erro ao redefinir senha:", err);
      setError("Erro ao redefinir senha");
      setLoading(false);
    }
  };

  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
      <div
        className="card shadow-lg"
        style={{ width: "100%", maxWidth: "400px" }}
      >
        <div className="card-header text-center bg-light">
          <h2>Redefinir Senha</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Nova Senha
              </label>
              <input
                type="password"
                className={`form-control ${
                  !passwordsMatch && formData.confirmPassword
                    ? "border-danger"
                    : ""
                }`}
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Digite sua nova senha"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirme a Nova Senha
              </label>
              <input
                type="password"
                className={`form-control ${
                  !passwordsMatch && formData.confirmPassword
                    ? "border-danger"
                    : ""
                }`}
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirme sua nova senha"
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading || !passwordsMatch}
            >
              {loading ? "Redefinindo..." : "Redefinir Senha"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
