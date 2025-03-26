import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

    try {
      const response = await axios.post(
        "http://localhost:3000/users/login",
        formData
      );
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Login bem-sucedido!");
      setLoading(false);
      navigate("/");
      setFormData({ email: "", password: "" });
    } catch (err) {
      console.error("Erro ao fazer login:", err);
      setError("Erro ao fazer login");
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email) {
      toast.error(
        "Por favor, preencha o campo de e-mail antes de redefinir a senha."
      );
      return;
    }
    try {
      await axios.post("http://localhost:3000/users/forgot-password", {
        email: formData.email,
      });
      toast.success(
        "Se um e-mail estiver cadastrado, você receberá um link para redefinição de senha."
      );
    } catch (err) {
      console.error("Erro ao solicitar redefinição de senha:", err);
      toast.error("Erro ao solicitar redefinição de senha.");
    }
  };

  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
      <div
        className="card shadow-lg"
        style={{ width: "100%", maxWidth: "600px" }}
      >
        <div className="card-header text-center bg-light">
          <h2>Login</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Senha
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Senha"
                required
              />
            </div>
            <div className="mb-3 text-end">
              <button
                type="button"
                className="btn btn-link p-0"
                onClick={handleForgotPassword}
              >
                Esqueci minha senha
              </button>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Entrando..." : "Entrar"}
            </button>
          </form>
          <div className="text-center mt-3">
            <p>
              Não tem uma conta?{" "}
              <button
                className="btn btn-link p-0"
                onClick={() => navigate("/register")}
              >
                Registre-se
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
