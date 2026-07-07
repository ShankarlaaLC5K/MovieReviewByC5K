import React, { useState, useEffect } from 'react';
import { fetchMovies } from './api/tmdb';
import MovieCard from './components/MovieCard';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadMovies = async () => {
      const data = await fetchMovies(search);
      setMovies(data);
    };
    loadMovies();
  }, [search]);

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <input 
        className="w-full p-2 mb-8 rounded bg-gray-800 border border-gray-700"
        placeholder="Search for a movie..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}
      </div>
    </div>
  );
}