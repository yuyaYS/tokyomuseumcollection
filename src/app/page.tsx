"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import SearchFilter from "./components/SearchFilter";
import ArtworkList from "./components/ArtworkList";

export type FilterOptions = {
  artist_name?: string;
  genre?: string;
  medium?: string;
  museums?: string[];
  production_year_from?: string;
  production_year_to?: string;
};

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({});

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword);
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    console.log("Filters changed:", newFilters);
    setFilters(newFilters);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Tokyo Museum Collection Search
      </h1>
      <div className="max-w-4xl mx-auto mb-8">
        <SearchBar onSearch={handleSearch} />
        <SearchFilter onFilterChange={handleFilterChange} />
      </div>
      {searchKeyword && (
        <ArtworkList keyword={searchKeyword} filters={filters} />
      )}
    </div>
  );
}
