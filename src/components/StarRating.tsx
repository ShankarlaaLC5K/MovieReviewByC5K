
import { useState } from "react";

interface Props {
  rating: number; // The average rating
  onRate?: (rating: number) => void; // Optional: callback to save a user rating
}

export const StarRating = ({ rating, onRate }: Props) => {
  const [hover, setHover] = useState(0);
  const displayRating = hover || rating;

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`text-2xl ${star <= displayRating ? "text-yellow-400" : "text-gray-600"}`}
          onClick={() => onRate && onRate(star)}
          onMouseEnter={() => onRate && setHover(star)}
          onMouseLeave={() => onRate && setHover(0)}
          disabled={!onRate}
        >
          ★
        </button>
      ))}
    </div>
  );
};