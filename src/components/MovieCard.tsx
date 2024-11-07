import React from "react";
import styles from "./MovieCard.module.css";


interface MovieCardProps {
  title: string;
  image: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, image }) => (
  <div className="{styles.movieCard}">
    <img src={image} alt={title} className={styles.movieImage}/>
    <h3 className={styles.movieTitle}>{title}</h3>
</div>
);

export default MovieCard;