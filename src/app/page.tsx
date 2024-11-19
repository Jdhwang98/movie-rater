import React from "react";
import MovieCard from "../components/MovieCard";
import {
  getPopularMovies,
  getMoviesInTheaters,
  getTopMoviesOfWeek,
  getUpcomingMovies,
  getImageUrl,
} from "./services/tmdbService";
import Link from "next/link";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default async function Home() {
  const [popularMovies, inTheaters, topOfWeek, upcoming] = await Promise.all([
    getPopularMovies(),
    getMoviesInTheaters(),
    getTopMoviesOfWeek(),
    getUpcomingMovies(),
  ]);

  const genre = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller", "Fantasy"];

  return (
    <div className="w-full bg-gradient-to-b from-black via-black to-gray-800 min-h-screen flex flex-col justify-between">
      <div className="max-w-screen-lg mx-auto flex flex-col px-4">
        <h2 className="text-4xl sm:text-7xl font-bold text-white mt-8">Movie Rater</h2>
        <h5 className="text-gray-500 mt-2">Hello, Welcome to the movie rater website, whats on your watchlist...</h5>

        {/* Movie Genre Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {genre.map((g) => (
            <Link key={g} href={`/genres/${g.toLowerCase()}`}>
              <button
                className="bg-gray-900 text-white p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 duration-300 w-full text-center"
              >
                {g}
              </button>
            </Link>
          ))}
        </div>

        {/* Top 20 Movies */}
        <h3 className="text-2xl text-white font-bold mt-8">Top 20 Movies</h3>
        <div className="movie-scroll mt-4 overflow-x-scroll whitespace-nowrap scrollbar-hide">
          {popularMovies.slice(0, 20).map((movie: Movie) => (
            <div key={movie.id} className="inline-block w-48 mr-4">
              <MovieCard title={movie.title} image={getImageUrl(movie.poster_path)} />
            </div>
          ))}
        </div>

        {/* In Theaters */}
        <h3 className="text-2xl text-white font-bold mt-8">In Theaters</h3>
        <div className="movie-scroll mt-4 overflow-x-scroll whitespace-nowrap scrollbar-hide">
          {inTheaters.map((movie: Movie) => (
            <div key={movie.id} className="inline-block w-48 mr-4">
              <MovieCard title={movie.title} image={getImageUrl(movie.poster_path)} />
            </div>
          ))}
        </div>

        {/* Top 10 for the Week */}
        <h3 className="text-2xl text-white font-bold mt-8">Top 10 for the Week</h3>
        <div className="movie-scroll mt-4 overflow-x-scroll whitespace-nowrap scrollbar-hide">
          {topOfWeek.map((movie: Movie) => (
            <div key={movie.id} className="inline-block w-48 mr-4">
              <MovieCard title={movie.title} image={getImageUrl(movie.poster_path)} />
            </div>
          ))}
        </div>

        {/* Upcoming Movies */}
        <h3 className="text-2xl text-white font-bold mt-8">Coming Soon</h3>
        <div className="movie-scroll mt-4 overflow-x-scroll whitespace-nowrap scrollbar-hide">
          {upcoming.map((movie: Movie) => (
            <div key={movie.id} className="inline-block w-48 mr-4">
              <MovieCard title={movie.title} image={getImageUrl(movie.poster_path)} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-6 mt-8">
        <div className="max-w-screen-lg mx-auto text-center px-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Movie Rater. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
