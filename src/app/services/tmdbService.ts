// services/tmdbService.ts
import axios from "axios";

const API_KEY = "0b208e977bf30350249251d05e194969"; 
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const getImageUrl = (path: string, size = "w500") => 
  `https://image.tmdb.org/t/p/${size}${path}`;
