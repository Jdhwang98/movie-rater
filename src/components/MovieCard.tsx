import React from "react";

interface MovieCardProps {
  title: string;
  image: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, image }) => (
  <div className="movie-card">
    <img src={image} alt={title} />
    <h3>{title}</h3>
  </div>
);

export default MovieCard;