"use client";

import React, { useState } from "react";
import { FilterOptions } from "../page";

type SearchFilterProps = {
  onFilterChange: (filters: FilterOptions) => void;
};

const museums = [
  { code: " ", name: "Search from all museum" },
  { code: "edo-tokyo-museum", name: "Edo-Tokyo Museum" },
  { code: "topmuseum", name: "Tokyo Photographic Art Museum" },
  { code: "mot-art-museum", name: "Museum of Contemporary Art Tokyo" },
  { code: "tatemonoen", name: "Edo-Tokyo Open Air Architectural Museum" },
  { code: "teien-art-museum", name: "Tokyo Metropolitan Teien Art Museum" },
  { code: "tobikan", name: "Tokyo Metropolitan Art Museum " },
];

const genres = ["blocl-print", "other prints"];

export default function SearchFilter({ onFilterChange }: SearchFilterProps) {
  const [filters, setFilters] = useState<FilterOptions>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleMuseumChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedMuseums = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFilters((prev) => ({ ...prev, museums: selectedMuseums }));
  };

  const applyFilters = () => {
    console.log("Applying filters:", filters);
    onFilterChange(filters);
  };

  return (
    <div className="mb-4 p-4 border rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Search Filters</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="artist_name"
          placeholder="Artist Name"
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <select
          name="genre"
          onChange={handleInputChange}
          className="border p-2 rounded"
        >
          <option value="">Select Genre</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <input
          type="text"
          name="medium"
          placeholder="Medium"
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <select
          name="museums"
          multiple
          onChange={handleMuseumChange}
          className="border p-2 rounded"
        >
          {museums.map((museum) => (
            <option key={museum.code} value={museum.code}>
              {museum.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="production_year_from"
          placeholder="Production Year From"
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="production_year_to"
          placeholder="Production Year To"
          onChange={handleInputChange}
          className="border p-2 rounded"
        />
      </div>
      <button
        onClick={applyFilters}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Apply Filters
      </button>
    </div>
  );
}
