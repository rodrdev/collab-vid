import { toast, Bounce } from "react-toastify";
const NavBar = () => {
  const storedData = JSON.parse(localStorage.getItem("user"));

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

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img
            src="../../public/logo.webp"
            width="80"
            className="rounded-circle"
          />
        </a>
        <button
          className="btn btn-primary"
          onClick={() => handleGenerateLink(storedData.id)}
        >
          Gerar Link do Influenciador
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
