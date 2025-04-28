import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/navbar";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [channelName, setChannelName] = useState(""); // novo campo
  const [isInfluencer, setIsInfluencer] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setChannelName(user.channelName || "");
      setIsInfluencer(user.isInfluencer || true);
    }
  }, []);

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://collab-vid-back.onrender.com/users/edit/${user.id}`,
        {
          name,
          email,
          channelName,
          isInfluencer,
        }
      );
      toast.success("Informações atualizadas com sucesso!");
    } catch (err) {
      toast.error(err.response?.data?.error || "Erro ao atualizar informações");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    try {
      await axios.put(
        `https://collab-vid-back.onrender.com/users/edit-password/${user.id}`,
        {
          currentPassword,
          newPassword,
        }
      );
      toast.success("Senha alterada com sucesso!");
    } catch (err) {
      toast.error(err.response?.data?.error || "Erro ao atualizar senha");
    }
  };

  return (
    <>
      <NavBar />
      <div className="container mt-5">
        <h2 className="mb-4">Editar Perfil</h2>
        <ToastContainer position="top-right" autoClose={5000} theme="dark" />
        <div className="card p-4 mb-4">
          <h3 className="h5">Informações Pessoais</h3>
          <form onSubmit={handleInfoSubmit}>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                className="form-control"
                readOnly
                disabled
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nome:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Digite seu nome"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nome do Canal:</label>{" "}
              <input
                type="text"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="Digite o nome do seu canal"
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Salvar Alterações
            </button>
          </form>
        </div>

        <div className="card p-4">
          <h3 className="h5">Alterar Senha</h3>
          <form onSubmit={handlePasswordSubmit}>
            <div className="mb-3">
              <label className="form-label">Senha Atual:</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Digite sua senha atual"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Nova Senha:</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Digite a nova senha"
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Confirmar Nova Senha:</label>
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                placeholder="Confirme a nova senha"
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-danger w-100">
              Alterar Senha
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUser;
