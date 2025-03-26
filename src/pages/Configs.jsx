import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "../components/navbar";

const EditUser = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isInfluencer, setIsInfluencer] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    setName(user.name);
  }, [user]);

  const handleInfoSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/users/edit/${user.id}`, {
        name,
        email,
        isInfluencer,
      });
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
      await axios.put(`http://localhost:3000/users/edit-password/${user.id}`, {
        currentPassword,
        newPassword,
      });
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
              <label className="form-label">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu email"
                className="form-control"
              />
            </div>
            <div className="form-check mb-3">
              <input
                type="checkbox"
                checked={isInfluencer}
                onChange={() => setIsInfluencer(!isInfluencer)}
                className="form-check-input"
              />
              <label className="form-check-label">Sou Influenciador</label>
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
