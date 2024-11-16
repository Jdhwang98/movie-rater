"use client";

import { useState, useEffect } from "react";
import { getMoviesByGenre, genreMap, getImageUrl, searchMovies } from "../../services/tmdbService";

export default function GenrePage({ params }: { params: { genre: string } }) {
  const genre = params.genre;
  const [movies, setMovies] = useState([]);
  const [originalMovies, setOriginalMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);

      if (searchQuery.trim()) {
        setIsSearching(true);
        const searchedMovies = await searchMovies(searchQuery, 1);
        setMovies(searchedMovies);
      } else {
        setIsSearching(false);
        const genreId = genreMap[genre.toLowerCase()];
        if (!genreId) {
          console.error(`Invalid genre: ${genre}`);
          setLoading(false);
          return;
        }
        const newMovies = await getMoviesByGenre(genreId, page);
        if (page === 1) {
          setMovies(newMovies);
          setOriginalMovies(newMovies);
        } else {
          setMovies((prev) => [...prev, ...newMovies]);
        }
      }

      setLoading(false);
    };

    loadMovies();
  }, [genre, page, searchQuery]);

  useEffect(() => {
    if (!searchQuery.trim() && isSearching) {
      setMovies(originalMovies);
      setPage(1);
    }
  }, [searchQuery, isSearching, originalMovies]);

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
  }, [loading, searchQuery]);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold capitalize mb-6">{genre} Movies</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-4 text-black rounded-md"
      />

      {/* Movie grid */}
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
      {!loading && movies.length === 0 && <p className="text-center mt-4">No movies found.</p>}
    </div>
  );
}
