"use client";

import { useState, useEffect } from "react";

export default function VotingSession({ params }: { params: { sessionId: string } }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [nominations, setNominations] = useState<string[]>([]);

  const handleSearch = async () => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=YOUR_API_KEY&query=${searchQuery}`
    );
    const data = await response.json();
    setSearchResults(data.results || []);
  };

  const addNomination = (movie: string) => {
    if (nominations.length < 10 && !nominations.includes(movie)) {
      setNominations([...nominations, movie]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-2xl font-bold">Voting Session: {params.sessionId}</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 mb-4 text-black rounded-md"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md mb-4"
      >
        Search
      </button>

      {/* Search Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchResults.map((movie) => (
          <div key={movie.id} className="bg-gray-800 p-4 rounded-md">
            <h3 className="text-lg font-semibold">{movie.title}</h3>
            <button
              onClick={() => addNomination(movie.title)}
              className="mt-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md"
            >
              Nominate
            </button>
          </div>
        ))}
      </div>

      {/* Nominations */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Your Nominations</h2>
        <ul>
          {nominations.map((movie, index) => (
            <li key={index}>{movie}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
