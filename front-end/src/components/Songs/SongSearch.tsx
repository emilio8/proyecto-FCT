"use client";

import { useState } from "react";

interface SongSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SongSearch = ({ onSearch, placeholder = "Buscar canciones..." }: SongSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder={placeholder}
        className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
      />
      <svg
        className="absolute right-4 top-3.5 h-6 w-6 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </div>
  );
};

export default SongSearch;