// src/components/api.ts
const API_KEY = "9689653b6f02170262279a6927d7fa2d";
const BASE_URL = "https://api.themoviedb.org/3";

export const getMovieUrl = (query: string) => {
  return query 
    ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    : `${BASE_URL}/movie/popular?api_key=${API_KEY}`;
};