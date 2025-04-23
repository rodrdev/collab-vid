import { useState, useEffect } from "react";
import { ToastContainer, Bounce } from "react-toastify";
import NavBar from "../components/navbar";
import VideoCard from "../components/videoCard ";
import LoadingSpinner from "../components/loading";
import axios from "axios";

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [videos, setVideos] = useState([]);
  const idClinet = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(
          `https://collab-vid-back.onrender.com/videos/${idClinet.id}`
        );
        setVideos(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar vídeos:", error);
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  const getArticleDetails = async (url) => {
    try {
      const response = await fetch(url);
      const html = await response.text();
      const doc = new DOMParser().parseFromString(html, "text/html");
      const title =
        doc.querySelector("title")?.innerText || "Título não encontrado";
      const image =
        doc.querySelector('meta[property="og:image"]')?.content ||
        "https://via.placeholder.com/150";
      return { title, image };
    } catch {
      return {
        title: "Erro ao carregar título",
        image: "https://via.placeholder.com/150",
      };
    }
  };

  const handleFetchArticle = async (video) => {
    const { title, image } = await getArticleDetails(video.url);
    setVideos((prevVideos) =>
      prevVideos.map((v) =>
        v.id === video.id ? { ...v, articleDetails: { title, image } } : v
      )
    );
  };

  const isYouTubeVideo = (url) =>
    /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/(watch\?v=|embed\/)([a-zA-Z0-9_-]{11})/.test(
      url
    );

  const convertToEmbedUrl = (url) =>
    `https://www.youtube.com/embed/${new URLSearchParams(
      new URL(url).search
    ).get("v")}`;

  const getImageFromUrl = (url, video) => {
    if (isYouTubeVideo(url)) return convertToEmbedUrl(url);
    return video.articleDetails?.image || "https://via.placeholder.com/150";
  };

  useEffect(() => {
    videos.forEach((video) => {
      if (video.url && !isYouTubeVideo(video.url) && !video.articleDetails) {
        handleFetchArticle(video);
      }
    });
  }, [videos]);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        theme="dark"
        transition={Bounce}
      />
      <NavBar />
      <div className="container my-4">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="row g-4">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isYouTubeVideo={isYouTubeVideo}
                convertToEmbedUrl={convertToEmbedUrl}
                getImageFromUrl={getImageFromUrl}
                senderName={video.senderName}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
