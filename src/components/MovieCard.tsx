import type { Movie } from "./types";
import {genreMap} from './types'

interface Props {
  movie: Movie;
}

export const MovieCard = ({ movie }: Props) => {
  const posterUrl = movie.poster_path 
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
    : "/placeholder.jpg";

  // Extract year and genres
  const releaseYear = movie.release_date ? movie.release_date.split("-")[0] : "N/A";
  const genreNames = movie.genre_ids
    ?.map((id) => genreMap[id])
    .filter(Boolean)
    .slice(0, 2) 
    .join(", ");

  return (
    <div className="group relative bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-2 border-transparent hover:border-blue-500">
      <img src={posterUrl} alt={movie.title} className="w-full h-80 object-cover" />


      <div className="absolute inset-0 bg-black/75 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
        <h3 className="text-white font-bold text-lg leading-tight mb-1">
          {movie.title}
        </h3>
        
        <div className="text-gray-300 text-sm mb-1">
          {releaseYear} <br/><span className="text-blue-400">Genre: {genreNames || "N/A"}</span>
        </div>

        <div className="text-yellow-400 font-bold text-sm">
          ★ {movie.vote_average.toFixed(1)}
        </div>
      </div>
    </div>
  );
};