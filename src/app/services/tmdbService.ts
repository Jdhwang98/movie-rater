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

// sort by genre
export const genreMap: { [key: string]: string } = {
  action: "28",
  comedy: "35",
  drama: "18",
  horror: "27",
  romance: "10749",
  "sci-fi": "878",
  thriller: "53",
  fantasy: "14",
};

export const getMoviesByGenre = async (genreId: string, page: number = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        with_genres: genreId,
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return [];
  }
};

export const searchMovies = async (query: string, page: number = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        query,
        page,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};
