"use client";

import { useState, useEffect } from "react";
import { getMoviesByGenre, genreMap, getImageUrl } from "../../services/tmdbService";
import Link from "next/link";

export default function GenrePage({ params }: { params: { genre: string } }) {
  const genre = params.genre;
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      const genreId = genreMap[genre.toLowerCase()];
      if (!genreId) {
        console.error(`Invalid genre: ${genre}`);
        setLoading(false);
        return;
      }
      const newMovies = await getMoviesByGenre(genreId, page);
      setMovies((prev) => [...prev, ...newMovies]);
      setLoading(false);
    };

    loadMovies();
  }, [genre, page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 100 &&
        !loading
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* <h2 className="text-4xl sm:text-7xl font-bold text-white mt-8"><Link href="../">Movie Rater</Link></h2> */}
      <h1 className="text-3xl font-bold capitalize mb-6">{genre} Movies</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className="rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{movie.title}</h3>
          </div>
        ))}
      </div>
      {loading && <p className="text-center mt-4">Loading...</p>}
    </div>
  );
}
