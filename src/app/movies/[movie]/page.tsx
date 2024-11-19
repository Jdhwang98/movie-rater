
import { getMovieDetailsById,getImageUrl } from "../../services/tmdbService";

export default async function MoviePage({ params }: { params: { id: number } }) {
const movie = await getMovieDetailsById(912649);
return(
<div className="max-w-screen-xl mx-auto px-8 py-12">
        <div className="flex items-center space-x-12">
            <div className="w-72">
                <img id="moviePoster" src={getImageUrl(movie.poster_path)} alt="Movie Poster" className="rounded-lg shadow-lg"></img>
            </div>
            <div>
                <h1 id="movieTitle" className="text-5xl font-bold mb-4">{movie.title}</h1>
                <p id="movieInfo" className="text-2xl text-gray-300 mt-2">Year: {movie.release_date.split('-')[0]} | {movie.genres.map(genre => genre.name).join(', ')}</p>
                <p id="movieRating" className="text-2xl text-yellow-400 mt-1">IMDb Rating: {movie.vote_average}</p>
            </div>
        </div>

        <div className="mt-12">
            <h3 className="text-3xl font-semibold mb-6">Rate this Movie</h3>
            <div className="flex space-x-4" id="starRating">
                <button data-value="1" className="text-gray-500 text-5xl hover:text-yellow-400">★</button>
                <button data-value="2" className="text-gray-500 text-5xl hover:text-yellow-400">★</button>
                <button data-value="3" className="text-gray-500 text-5xl hover:text-yellow-400">★</button>
                <button data-value="4" className="text-gray-500 text-5xl hover:text-yellow-400">★</button>
                <button data-value="5" className="text-gray-500 text-5xl hover:text-yellow-400">★</button>
            </div>
        </div>

        <div className="mt-12">
            <h3 className="text-3xl font-semibold mb-6">Add a Comment</h3>
            <div className="space-y-6">
                <textarea id="commentText" placeholder="Write your comment here..." 
                    className="w-full p-6 text-black text-lg rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"></textarea>
                <button id="submitComment" 
                    className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition text-xl">
                    Submit Comment
                </button>
            </div>
            <div id="comments" className="mt-8">
                <h4 className="text-2xl font-semibold mb-6">Comments:</h4>
    
            </div>
        </div>
        

       
        </div>
   

);
}