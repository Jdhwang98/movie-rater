import React from "react";
import MovieCard from "../components/MovieCard";
import { getPopularMovies, getImageUrl } from "./services/tmdbService";
import Link from "next/link";

export default async function Home() {
  const movies = await getPopularMovies();

  const genre = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller", "Fantasy"];

  return (
    // Movie Rater Title and Text
    <div className="w-full bg-gradient-to-b from-black via-black to-gray-800">
      <div className="max-w-screen-lg mx-auto flex flex-col px-4">
        <h2 className="text-4xl sm:text-7xl font-bold text-white mt-8">Movie Rater</h2>
        <h5 className="text-gray-500 mt-2">Hello, Welcome to the movie rater website, what's on your watchlist...</h5>
        
        {/* Movie Genre Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {genre.map((g) => (
            // adjusted for dynamic routing
            <Link key={g} href={`/genres/${g.toLowerCase()}`}> 
              <button
                className="bg-gray-900 text-white p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 duration-300 w-full text-center"
              >
                {g}
              </button>
            </Link>
          ))}
        </div>

        {/* Movie Grid */}
        <div className="movie-list mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              image={getImageUrl(movie.poster_path)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}