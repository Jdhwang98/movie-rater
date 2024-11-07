import React from "react";
import MovieCard from "../components/MovieCard";
import { getPopularMovies, getImageUrl } from "./services/tmdbService";


// export default function Home() {

//   const genre = ["Action", "Comedy", "Drama", "Horror", "Romance", "Sci-Fi", "Thriller", "Fantasy"]



//   return (
//     <div className="h-screen w-full bg-gradient-to-b from-black via-black to-gray-800">
//       <div className="max-w-screen-lg mx-auto flex flex-col justify-center h-full px-4">
//         <h2 className="text-4xl sm:text-7xl font-bold text-white">Movie Rater</h2>
//         <h5 className="text-gray-500 mt-2">Hello, Welcome to the movie rater website, whats on your watchlist...</h5>


//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
//           {genre.map((genre) => (
//             <div
//               key={genre}
//               className="bg-gray-900 text-white p-4 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 duration-300"
//             >
//               {genre}
//             </div>

//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

  // Movie Card API logic
  export default async function HomePage() {
    const movies = await getPopularMovies();
  
    return (
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            title={movie.title}
            image={getImageUrl(movie.poster_path)}
          />
        ))}
      </div>
    );
  }

