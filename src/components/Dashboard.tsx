import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { MovieGrid } from "./MovieGrid";

export const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [minRating, setMinRating] = useState<number>(0);
  const [yearFilter, setYearFilter] = useState<number | "">("");

  const genres = [
    { id: "28", name: "Action" },
    { id: "12", name: "Adventure" },
    { id: "16", name: "Animation" },
    { id: "35", name: "Comedy" },
    { id: "80", name: "Crime" },
    { id: "18", name: "Drama" },
    { id: "14", name: "Fantasy" },
    { id: "27", name: "Horror" },
    { id: "10749", name: "Romance" },
    { id: "878", name: "Sci-Fi" },
    { id: "53", name: "Thriller" },
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1949 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Movie Browser</h1>
        <div className="max-w-2xl mx-auto">
          <SearchBar onSearch={setSearchQuery} />
        </div>
      </header>


      <div className="flex flex-row flex-nowrap items-center justify-center gap-4 bg-gray-800 p-4 rounded-lg shadow-md overflow-x-auto">
        

        <select
          className="bg-gray-900 border border-gray-700 p-2 rounded text-white w-40"
          onChange={(e) => setGenreFilter(e.target.value)}
          value={genreFilter}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>


        <select
          className="bg-gray-900 border border-gray-700 p-2 rounded text-white w-32"
          onChange={(e) => setYearFilter(e.target.value === "" ? "" : Number(e.target.value))}
          value={yearFilter}
        >
          <option value="">All Years</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>


        <div className="flex items-center gap-2 whitespace-nowrap">
          <label className="text-sm text-gray-400">Min Rating:</label>
          <input
            type="number"
            min="0"
            max="10"
            step="0.5"
            placeholder="0"
            value={minRating === 0 ? "" : minRating}
            onChange={(e) => {
              const val = e.target.value;
              setMinRating(val === "" ? 0 : Number(val));
            }}
            className="bg-gray-900 border border-gray-700 p-2 rounded w-16 text-center text-white outline-none"
          />
        </div>
      </div>


      <div className="mt-8">
        <MovieGrid
          query={searchQuery}
          genre={genreFilter}
          minRating={minRating}
          year={yearFilter}
        />
      </div>
    </div>
  );
};
