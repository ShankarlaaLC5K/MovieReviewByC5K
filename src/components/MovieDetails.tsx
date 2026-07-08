import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { StarRating } from "./StarRating";

interface MovieData {
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
}

// Named export to avoid default export conflicts
export const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [userRating, setUserRating] = useState(() => {
    const saved = localStorage.getItem(`rating-${id}`);
    return saved ? Number(saved) : 0;
  });

  const [details, setDetails] = useState<MovieData | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchDetails = async () => {
      try {
        const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        const data = await res.json();
        setDetails(data);
      } catch (err) {
        console.error("Failed to fetch movie details", err);
      }
    };
    fetchDetails();
  }, [id]);

  const handleSave = () => {
    if (!id) return;
    localStorage.setItem(`rating-${id}`, String(userRating));
    setIsEditing(false);
  };

  const handleClose = () => {
    navigate("/"); // Returns to dashboard
  };

  if (!details) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50" 
      onClick={handleClose}
    >
      <div 
        className="bg-gray-900 border border-gray-700 p-8 rounded-xl max-w-2xl w-full relative shadow-2xl" 
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleClose} 
          className="absolute top-4 right-4 text-3xl text-gray-400 hover:text-white"
        >
          &times;
        </button>

        <div className="flex flex-col md:flex-row gap-8">
          <img 
            src={`https://image.tmdb.org/t/p/w400${details.poster_path}`} 
            alt={details.title} 
            className="rounded-lg w-full md:w-64 object-cover" 
          />
          
          <div className="flex flex-col">
            <h2 className="text-4xl font-bold text-white mb-2">{details.title}</h2>
            <p className="text-gray-400 mb-4">Released: {details.release_date}</p>
            <p className="text-gray-300 leading-relaxed mb-6">{details.overview}</p>

            <div className="mt-auto">
              <p className="text-sm text-gray-400">Average Rating:</p>
              <StarRating rating={Math.round(details.vote_average / 2)} />

              <div className="mt-4">
                <p className="text-sm text-gray-400">Your Rating:</p>
                <StarRating 
                  rating={userRating} 
                  onRate={isEditing || userRating === 0 ? (r) => setUserRating(r) : undefined} 
                />
                
                <div className="flex gap-4 mt-2">
                  {(isEditing || userRating === 0) && userRating > 0 && (
                    <button onClick={handleSave} className="bg-blue-600 px-4 py-1 rounded text-sm text-white">Save</button>
                  )}
                  {!isEditing && userRating > 0 && (
                    <button onClick={() => setIsEditing(true)} className="text-blue-400 text-sm hover:underline">Edit</button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};