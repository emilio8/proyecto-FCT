"use client";

import { useState } from "react";
import { SortOption } from "@/hooks/useSongOrder";

interface SongOrderProps {
  onSortChange: (sortOption: SortOption) => void;
  currentSort: SortOption;
}

const SongOrder = ({ onSortChange, currentSort }: SongOrderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: "newest" as SortOption, label: "Más recientes primero", category: "Fecha" },
    { value: "oldest" as SortOption, label: "Más antiguas primero", category: "Fecha" },
    { value: "title-asc" as SortOption, label: "Título (A - Z)", category: "Título" },
    { value: "title-desc" as SortOption, label: "Título (Z - A)", category: "Título" },
    { value: "creador-asc" as SortOption, label: "Creador (A - Z)", category: "Creador" },
    { value: "creador-desc" as SortOption, label: "Creador (Z - A)", category: "Creador" },
  ];

  // Agrupar opciones por categoría
  const groupedOptions = sortOptions.reduce((acc, option) => {
    if (!acc[option.category]) {
      acc[option.category] = [];
    }
    acc[option.category].push(option);
    return acc;
  }, {} as Record<string, typeof sortOptions>);

  const currentLabel = sortOptions.find(option => option.value === currentSort)?.label || "Sin ordenar";

  const handleSortChange = (sortOption: SortOption) => {
    onSortChange(sortOption);
    setIsOpen(false);
  };

  const handleClearSort = () => {
    onSortChange("none");
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Botón de ordenamiento */}
      <button
        onClick={toggleDropdown}
        className={`flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-colors ${
          currentSort !== "none" ? "border-blue-300 bg-blue-50" : ""
        }`}
      >
        <svg
          className="h-5 w-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
          />
        </svg>
        <span className="text-gray-700 font-medium">
          {currentSort !== "none" ? "Ordenado" : "Ordenar"}
        </span>
        {/* Indicador visual cuando está ordenado */}
        {currentSort !== "none" && (
          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
        )}
        <svg
          className={`h-4 w-4 text-gray-600 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown de opciones */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-72 border border-gray-200 rounded-lg bg-white shadow-lg z-20 max-h-96 overflow-y-auto">
          <div className="py-2">
            <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-100">
              Ordenar por:
            </div>
                        {/* Botón de limpiar */}
            {currentSort !== "none" && (
              <>
                <div className="border-t border-gray-100 my-1"></div>
                <button
                  onClick={handleClearSort}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-red-50 transition-colors text-red-600 font-medium"
                >
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    <span>Limpiar ordenamiento</span>
                  </div>
                </button>
              </>
            )}
          </div>
          
          {/* Estado actual */}
          {currentSort !== "none" && (
            <div className="px-4 py-2 text-xs text-blue-600 bg-blue-50 border-t border-gray-100">
              Ordenando por: {currentLabel}
            </div>
          )}
            {/* Opciones de ordenamiento agrupadas */}
            {Object.entries(groupedOptions).map(([category, options]) => (
              <div key={category}>
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
                  {category}
                </div>
                {options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortChange(option.value)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                      currentSort === option.value
                        ? "bg-blue-50 text-blue-700 font-medium"
                        : "text-gray-700"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option.label}</span>
                      {currentSort === option.value && (
                        <svg
                          className="h-4 w-4 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default SongOrder;