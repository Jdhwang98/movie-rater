"use client";

import { useEffect, useState } from "react";
import { getMovieDetailsById, getImageUrl } from "../../services/tmdbService";
import Image from 'next/image';


export default function MoviePage({ params }: { params: { movie: string } }) {
    const [movie, setMovie] = useState<any>(null);
    const [rating, setRating] = useState<number | null>(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState<string[]>([]);

    useEffect(() => {
        const fetchMovie = async () => {
            const movieData = await getMovieDetailsById(params.movie);
            setMovie(movieData);
        };

        fetchMovie();
    }, [params.movie]);

    const handleRatingClick = (star: number) => {
        setRating(star);
    };

    const handleCommentSubmit = () => {
        if (comment.trim()) {
            setComments([...comments, comment]);
            setComment("");
        }
    };

    if (!movie) {
        return <div>Loading...</div>;
    }

    const releaseYear = movie.release_date.split("-")[0];
    const genres = movie.genres.map((genre: any) => genre.name).join(", ");

    return (
        <div className="max-w-screen-xl mx-auto px-8 py-12">
            <div className="flex items-center space-x-12">
                <div className="w-72">
                    <Image src={getImageUrl(movie.poster_path)} alt="Movie Poster" className="rounded-lg shadow-lg" width={300} height={300} />
                </div>
                <div>
                    <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
                    <p className="text-2xl text-gray-300 mt-2">
                        Year: {releaseYear} | {genres}
                    </p>
                    <p className="text-2xl text-yellow-400 mt-1">
                        IMDb Rating: {movie.vote_average}
                    </p>
                </div>
            </div>

            <div className="mt-12">
                <h3 className="text-3xl font-semibold mb-6">Rate this Movie</h3>
                <div className="flex space-x-4" id="starRating">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            data-value={star}
                            className={`text-5xl ${rating >= star ? "text-yellow-400" : "text-gray-500"
                                } hover:text-yellow-400`}
                            onClick={() => handleRatingClick(star)}>
                            ★
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-12">
                <h3 className="text-3xl font-semibold mb-6">Add a Comment</h3>
                <div className="space-y-6">
                    <textarea
                        id="commentText"
                        placeholder="Write your comment here..."
                        className="w-full p-6 text-black text-lg rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)} />
                    <button
                        id="submitComment"
                        onClick={handleCommentSubmit}
                        className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 transition text-xl">
                        Submit Comment
                    </button>
                </div>
                <div id="comments" className="mt-8">
                    <h4 className="text-2xl font-semibold mb-6">Comments:</h4>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-lg">
                                <p className="text-gray-300">{comment}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400">No comments yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}