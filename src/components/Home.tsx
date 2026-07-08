// src/components/Home.tsx
import { useState } from "react";
import { SearchBar } from "./SearchBar";
import { MovieGrid } from "./MovieGrid";

export const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [minRating, setMinRating] = useState(0);
const [yearFilter, setYearFilter] = useState<number | "">("");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1949 }, (_, i) => currentYear - i);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-6 text-center">Movie Browser</h1>
        <SearchBar onSearch={setSearchQuery} />
      </header>

      {/* Filters Section */}
      <div className="flex flex-wrap items-center gap-4 bg-gray-800 p-4 rounded-lg shadow-md">
        {/* Genre Dropdown */}
        <select
          className="bg-gray-900 border border-gray-700 p-2 rounded text-white"
          onChange={(e) => setGenreFilter(e.target.value)}
          value={genreFilter}
        >
          <option value="">All Genres</option>
          <option value="28">Action</option>
          <option value="16">Animation</option>
          <option value="35">Comedy</option>
          <option value="878">Sci-Fi</option>
        </select>

        {/* Year Dropdown */}
  <select
  className="bg-gray-900 border border-gray-700 p-2 rounded text-white"
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

        {/* Rating Filter */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-400">Min Rating:</label>
          <input
            type="number"
            min="0"
            max="10"
     
            step="0.5"
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
            className="bg-gray-900 border border-gray-700 p-2 rounded w-16 text-center text-white"
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