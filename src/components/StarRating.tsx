interface StarRatingProps {
  initialRating?: number;
  onRate: (rating: number) => void;
}

export default function StarRating({ initialRating = 0, onRate }: StarRatingProps) {
  const [rating, setRating] = useState<number>(initialRating);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => {
            setRating(star);
            onRate(star);
          }}
          className={`text-xl ${star <= rating ? 'text-yellow-400' : 'text-gray-600'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}