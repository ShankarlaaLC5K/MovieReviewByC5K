
interface Props {
  rating: number; 
}

export const MovieRatingStars = ({ rating }: Props) => {

  const stars = Math.round(rating / 2);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-lg ${
            star <= stars ? "text-yellow-400" : "text-gray-600"
          }`}
        >
          ★
        </span>
      ))}
      <span className="ml-2 text-sm text-gray-400">
        ({rating.toFixed(1)}/10)
      </span>
    </div>
  );
};