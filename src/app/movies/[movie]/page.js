"use client";

import { useEffect, useState, use } from "react";
import axios from "axios";
import { getMovieDetailsById, getImageUrl, getCastMembers } from "../../services/tmdbService";
import Image from 'next/image';

export default function MoviePage({ params }) {
    const unwrappedParams = use(params);
    const [movie, setMovie] = useState(null);
    const [rating, setRating] = useState(null);
    const [comment, setComment] = useState("");
    const [comments, setComments] = useState([]);
    const [userName, setUserName] = useState("");
    const [cast, setCast] = useState([]);

    useEffect(() => {
        const fetchMovie = async () => {
            const movieData = await getMovieDetailsById(unwrappedParams.movie);
            setMovie(movieData);
        };

        const fetchComments = async () => {
            const response = await axios.get(`/api/comment?movieId=${unwrappedParams.movie}`);
            setComments(response.data);
        };

        const fetchCast = async () => {
            const castData = await getCastMembers(unwrappedParams.movie);
            setCast(castData.cast.slice(0, 15));
        };

        fetchMovie();
        fetchComments();
        fetchCast();
    }, [unwrappedParams.movie]);

    const handleRatingClick = (star) => {
        setRating(star);
    };

    const handleCommentSubmit = async () => {
        if (comment.trim() && userName.trim()) {
            const newComment = { movieId: unwrappedParams.movie, user: userName, comment };
            await axios.post("/api/comment", newComment);
            setComment("");
            const response = await axios.get(`/api/comment?movieId=${unwrappedParams.movie}`); // Refresh comments
            setComments(response.data);
        }
    };

    if (!movie) {
        return <div>Loading...</div>;
    }

    const releaseYear = movie.release_date.split("-")[0];
    const genres = movie.genres.map((genre) => genre.name).join(", ");

    return (
        <div className="max-w-screen-xl mx-auto px-8 py-12">
            {/* Movie Details */}
            <div className="flex items-center space-x-12">
                <div className="w-72">
                    <Image src={getImageUrl(movie.poster_path)} alt="Movie Poster" className="rounded-lg shadow-lg" width={300} height={300} />
                </div>
                <div>
                    <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
                    <p className="text-2xl text-gray-300 mt-2">Year: {releaseYear} | {genres}</p>
                    <p className="text-2xl text-yellow-400 mt-1">IMDb Rating: {movie.vote_average}</p>
                </div>
            </div>

            {/* Movie Overview */}
            <div className="mt-8">
                <h2 className="text-3xl font-semibold mb-4">Overview</h2>
                <p className="text-lg text-gray-300">{movie.overview}</p>
            </div>

            {/* Cast Members */}
            <div className="mt-8">
                <h2 className="text-3xl font-semibold mb-4">Top Cast Members</h2>
                <div className="flex overflow-x-auto space-x-4 py-2">
                    {cast.map((member, index) => (
                        <div key={index} className="flex-none w-40 flex flex-col items-center text-center">
                            <Image
                                src={getImageUrl(member.profile_path, "w200")}
                                alt={member.name}
                                className="rounded-lg"
                                width={100}
                                height={150}
                            />
                            <p className="text-lg font-semibold text-gray-200 mt-2">{member.name}</p>
                            <p className="text-sm text-gray-400">{member.character}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Ratings */}
            <div className="mt-12">
                <h3 className="text-3xl font-semibold mb-6">Rate this Movie</h3>
                <div className="flex space-x-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            className={`text-5xl ${rating >= star ? "text-yellow-400" : "text-gray-500"} hover:text-yellow-400`}
                            onClick={() => handleRatingClick(star)}>
                            ★
                        </button>
                    ))}
                </div>
            </div>

            {/* Comments Section */}
            <div className="mt-12">
                <h3 className="text-3xl font-semibold mb-6">Add a Comment</h3>
                <input
                    type="text"
                    placeholder="Your Name"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full p-2 mb-4 rounded text-black border border-gray-600" />
                <textarea
                    placeholder="Write your comment here..."
                    className="w-full p-6 text-black text-lg rounded-lg border border-gray-600"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)} />
                <button
                    onClick={handleCommentSubmit}
                    className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold hover:bg-yellow-500">
                    Submit Comment
                </button>

                {/* Display Comments */}
                <div className="mt-8">
                    <h4 className="text-2xl font-semibold mb-6">Comments:</h4>
                    {comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-lg mb-2 flex justify-between items-start">
                                <div>
                                    <p className="text-yellow-400 font-semibold">{comment.user}</p>
                                    <p className="text-gray-300">{comment.comment}</p>
                                </div>
                                <p className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleString()}</p>
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
