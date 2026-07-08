import { useEffect, useState } from "react";
import { MovieCard } from "./MovieCard";
import type { Movie } from "./types";
import { Link } from "react-router-dom";


interface Props {
  query: string;
  genre: string;
  minRating: number;
  year: number | "";
}export const MovieGrid = ({ query, genre, minRating, year }: Props) => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;
      
      if (query) {
        url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
      } else {
        if (genre) url += `&with_genres=${genre}`;
        if (year) url += `&primary_release_year=${year}`;
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        const filtered = (data.results || []).filter(
          (m: Movie) => m.vote_average >= minRating
        );
        setMovies(filtered);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [query, genre, minRating, year]);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <MovieCard movie={movie} />
          </Link>
        ))
      ) : (
        <p className="col-span-full text-center text-gray-400">No movies found.</p>
      )}
    </div>
  );
};