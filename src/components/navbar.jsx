import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";

const NavBar = () => {
  const storedData = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const handleGenerateLink = () => {
    const currentUrl = window.location.origin;
    const generatedLink = `${currentUrl}/${storedData.id}/${storedData.channelName}`;
    navigator.clipboard
      .writeText(generatedLink)
      .then(() => {
        toast.success(`Link do influenciador copiado: ${generatedLink}`, {
          position: "top-right",
          autoClose: 1000,
          theme: "dark",
          transition: Bounce,
        });
      })
      .catch(() => {
        alert("Falha ao copiar o link!");
      });
  };

  const handleGoToSettings = () => {
    navigate("/configuracoes");
  };

  const handleGoToHome = () => {
    navigate("/home");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light border border-gray-500">
      <div className="container-fluid">
        <img src="../../public/logo.png" width="180" />
        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={handleGoToHome}>
            Home
          </button>
          <button className="btn btn-primary" onClick={handleGenerateLink}>
            Gerar Link
          </button>
          <button
            className="btn btn-secondary d-flex align-items-center gap-1"
            onClick={handleGoToSettings}
          >
            <FiSettings size={18} />
            Configurações
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
