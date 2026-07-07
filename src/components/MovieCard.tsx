import { Movie } from '../types/movie';
import { getImageUrl } from '../api/tmdb';
import StarRating from './StarRating';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 shadow-lg transition hover:scale-105">
      <img 
        src={getImageUrl(movie.poster_path)} 
        alt={movie.title} 
        className="rounded w-full h-64 object-cover" 
      />
      <h3 className="font-bold mt-2 truncate text-white">{movie.title}</h3>
      <p className="text-sm text-gray-400 mb-2">{movie.release_date?.split('-')[0]}</p>
      
      <StarRating 
        initialRating={Math.round(movie.vote_average / 2)} 
        onRate={(r) => console.log(`User rated ${movie.title} with ${r} stars`)}
      />
    </div>
  );
}