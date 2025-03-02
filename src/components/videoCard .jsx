import PropTypes from "prop-types";

const VideoCard = ({ video, isYouTubeVideo, convertToEmbedUrl }) => {
  return (
    <div className="col-md-6 col-lg-4">
      <div className="card shadow-lg h-100" style={{ borderRadius: "10px" }}>
        <div className="position-relative">
          {isYouTubeVideo(video.url) ? (
            <iframe
              className="card-img-top rounded-top"
              width="100%"
              height="200"
              src={convertToEmbedUrl(video.url)}
              title={`YouTube video ${video.id}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <img
              src="../../public/news.svg"
              alt="Imagem da matéria"
              className="card-img-top rounded-top"
              width="100%"
              height="200"
            />
          )}
        </div>
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-primary fw-bold">{video.title}</h5>
          <p className="card-text text-secondary flex-grow-1">
            {video.description}
          </p>
          <p className="text-muted">
            Enviado por: <strong>{video.senderName || "Desconhecido"}</strong>
          </p>
          <a
            href={video.url}
            className="btn btn-primary btn-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ir para o link
          </a>
        </div>
      </div>
    </div>
  );
};

VideoCard.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    senderName: PropTypes.string,
    articleDetails: PropTypes.shape({
      title: PropTypes.string,
      image: PropTypes.string,
    }),
  }).isRequired,
  isYouTubeVideo: PropTypes.func.isRequired,
  convertToEmbedUrl: PropTypes.func.isRequired,
  getImageFromUrl: PropTypes.func.isRequired,
};

export default VideoCard;
