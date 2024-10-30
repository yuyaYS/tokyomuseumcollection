"use client";

import { useState } from "react";
import SearchBar from "./components/SearchBar";
import ArtworkList from "./components/ArtworkList";

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Tokyo Museum Collection Search
      </h1>
      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar onSearch={setSearchKeyword} />
      </div>
      {searchKeyword && <ArtworkList keyword={searchKeyword} />}
    </div>
  );
}
