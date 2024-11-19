import React from "react";
import styles from "./MovieCard.module.css";
import Image from 'next/image';


interface MovieCardProps {
  title: string;
  image: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ title, image }) => (
  <div className="{styles.movieCard}">
    <Image src={image} alt={title} className={styles.movieImage} width={200} height={300} />
    <h3 className={styles.movieTitle}>{title}</h3>
  </div>
);

export default MovieCard;