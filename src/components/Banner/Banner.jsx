import React from 'react';
import './Banner.css'; // Importa el archivo CSS

const Banner = ({ videoUrl }) => {
  return (
    <div className="banner-container">
      <video className="banner-video" autoPlay loop muted>
        <source src={videoUrl} type="video/mp4" />
        Tu navegador no soporta la etiqueta de video.
      </video>
    </div>
  );
};

export default Banner;
