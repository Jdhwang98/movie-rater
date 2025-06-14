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

export const getMoviesInTheaters = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies in theaters:", error);
    return [];
  }
};

export const getTopMoviesOfWeek = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/trending/movie/week`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data.results.slice(0, 10);
  } catch (error) {
    console.error("Error fetching top movies of the week:", error);
    return [];
  }
};

export const getUpcomingMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/upcoming`, {
      params: {
        api_key: API_KEY,
        language: "en-US",
        page: 1,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching Upcoming movies:", error);
    return [];
  }
};

export const getMovieDetailsById = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie:", error);
    return [];
  }
};


//  return user profile name - john
// export const getProfileInformation = async () => {
//   try {
//     const response = await fetch(`/api/profile/${name}`);
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching user profile: ", error);
//     return [];
//   }
// };

export const getCastMembers = async (id: number) => {
  try {
    const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching movie:", error);
    return [];
  }
};