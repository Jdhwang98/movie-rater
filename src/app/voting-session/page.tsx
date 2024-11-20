"use client";

import React, { useState, useEffect } from "react";
import { searchMovies } from "../services/tmdbService";
import { useRouter } from "next/navigation";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function VotingSessionPage() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [nominatedMovies, setNominatedMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Session will only work once web app is hosted to server
  // Generate a unique session ID
  useEffect(() => {
    const generateSessionId = () => {
      const newSessionId = Math.random().toString(36).substr(2, 9);
      setSessionId(newSessionId);
    };
    generateSessionId();
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    const results = await searchMovies(searchQuery, 1);
    setSearchResults(results);
    setLoading(false);
  };

  const handleMovieSelect = (movie: Movie) => {
    if (nominatedMovies.length >= 10) {
      alert("You can nominate up to 10 movies only.");
      return;
    }
    if (nominatedMovies.some((m) => m.id === movie.id)) {
      alert("This movie is already nominated.");
      return;
    }

    setNominatedMovies((prev) => [...prev, movie]);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleInviteLinkCopy = () => {
    const inviteLink = `${window.location.origin}/voting-session/${sessionId}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      alert("Invite link copied to clipboard!");
    });
  };

  const handleFinalizeVoting = () => {
    // Navigate to the results page
    router.push(`/voting-session/${sessionId}/results`);
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-6">Voting Session</h1>

      {/* Invite Link */}
      {sessionId && (
        <div className="mb-4">
          <p className="text-gray-300 mb-2">Invite others to join:</p>
          <button
            onClick={handleInviteLinkCopy}
            className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500"
          >
            Copy Invite Link
          </button>
        </div>
      )}

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        className="w-full p-2 mb-4 text-black rounded-md"
      />
      <button
        onClick={handleSearch}
        className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-500 mb-4"
      >
        Search
      </button>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {searchResults.map((movie) => (
            <div
              key={movie.id}
              onClick={() => handleMovieSelect(movie)}
              className="bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transform hover:scale-105 duration-300"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded-md mb-2"
              />
              <h3 className="text-lg font-semibold">{movie.title}</h3>
            </div>
          ))}
        </div>
      )}

      {/* Nominated Movies */}
      <h2 className="text-2xl font-bold mt-6 mb-4">Your Nominations:</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {nominatedMovies.map((movie) => (
          <div key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow-md">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-md mb-2"
            />
            <h3 className="text-lg font-semibold">{movie.title}</h3>
          </div>
        ))}
      </div>

      {/* Finalize Button */}
      <button
        onClick={handleFinalizeVoting}
        className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-500 mt-6"
      >
        Finalize Voting
      </button>
    </div>
  );
}
