import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const Influencer = () => {
  const { id, channelName } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    observation: "",
    link: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
        "https://collab-vid-back.onrender.com/videos",
        {
          title: formData.title,
          url: formData.link,
          description: formData.observation,
          influencerId: id,
          senderName: formData.name,
        }
      );

      console.log("Video enviado com sucesso", response.data);
      toast.success("Formulário enviado com sucesso!");
      setLoading(false);

      setFormData({
        name: "",
        title: "",
        observation: "",
        link: "",
      });
    } catch (error) {
      console.error("Erro ao enviar o vídeo:", error);
      setError("Ocorreu um erro ao enviar o vídeo.");
      setLoading(false);
    }
  };

  return (
    <div className="container min-vh-100 d-flex flex-column justify-content-center align-items-center">
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
      <div
        className="card shadow-lg"
        style={{ width: "100%", maxWidth: "600px", borderRadius: "15px" }}
      >
        <div
          className="card-header bg-light text-center"
          style={{ borderRadius: "15px 15px 0 0" }}
        >
          <h2>
            Bem-vindo ao canal:{" "}
            <strong className="text-dark">{channelName}</strong>
          </h2>
          <h3>Indique um vídeo</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
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
              <label htmlFor="title" className="form-label">
                Título
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Título"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="observation" className="form-label">
                Observação
              </label>
              <textarea
                className="form-control"
                id="observation"
                rows="3"
                value={formData.observation}
                onChange={handleChange}
                placeholder="Observações sobre o vídeo ou comentário"
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="link" className="form-label">
                Link
              </label>
              <input
                type="url"
                className="form-control"
                id="link"
                value={formData.link}
                onChange={handleChange}
                placeholder="Link do vídeo"
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button
              type="submit"
              className="btn btn-success w-100"
              disabled={loading}
              style={{
                borderRadius: "10px",
                fontWeight: "bold",
                padding: "12px",
                backgroundColor: "#28a745",
              }}
            >
              {loading ? "Verificando..." : "Enviar"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Influencer;
