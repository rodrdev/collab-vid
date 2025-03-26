import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    isInfluencer: false,
    channelName: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const passwordsMatch = formData.password === formData.confirmPassword;

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === "checkbox" ? checked : value,
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
      const response = await axios.post(
        "http://localhost:3000/users/register",
        formData
      );
      toast.success("Usuário criado com sucesso!");
      setLoading(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        isInfluencer: false,
        channelName: "",
      });
      console.log(response);
      navigate("/login");
    } catch (err) {
      console.error("Erro ao criar usuário:", err);
      setError("Erro ao criar usuário");
      setLoading(false);
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
          <h2>Cadastro de Usuário</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="channelName" className="form-label">
                Nome do canal
              </label>
              <input
                type="text"
                className="form-control"
                id="channelName"
                value={formData.channelName}
                onChange={handleChange}
                placeholder="Nome do canal"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Nome
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Nome"
                required
              />
            </div>
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
                className={`form-control ${
                  !passwordsMatch && formData.confirmPassword
                    ? "border-danger"
                    : ""
                }`}
                id="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Senha"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirme a Senha
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
                placeholder="Confirme a senha"
                required
              />
            </div>
            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="isInfluencer"
                checked={formData.isInfluencer}
                onChange={handleChange}
              />
              <label className="form-check-label" htmlFor="isInfluencer">
                Sou um Influenciador
              </label>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading || !passwordsMatch}
            >
              {loading ? "Cadastrando..." : "Criar Conta"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
