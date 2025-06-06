"use client";

import { useState } from "react";

interface SongFilterProps {
  selectedUser: string;
  onUserChange: (user: string) => void;
  users: string[];
}

const SongFilter = ({ selectedUser, onUserChange, users }: SongFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleUserSelect = (user: string) => {
    onUserChange(user);
    setIsOpen(false);
  };

  const handleClearFilter = () => {
    onUserChange("");
    setIsOpen(false);
  };

  const toggleFilter = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      {/* Botón del filtro */}
      <button
        onClick={toggleFilter}
        className={`flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-colors ${
          selectedUser ? "border-blue-300 bg-blue-50" : ""
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
            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
          />
        </svg>
        <span className="text-gray-700 font-medium">
          {selectedUser ? "Filtrado" : "Filtro"}
        </span>
        {/* Indicador visual cuando está filtrado */}
        {selectedUser && (
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

      {/* Panel del filtro desplegable */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 border border-gray-200 rounded-lg bg-white shadow-lg z-10">
          <div className="py-2">
            <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b border-gray-100">
              Filtrar por:
            </div>
            
            {/* Botón de limpiar */}
            {selectedUser && (
              <>
                <button
                  onClick={handleClearFilter}
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
                    <span>Limpiar filtro</span>
                  </div>
                </button>
                <div className="border-t border-gray-100 my-1"></div>
              </>
            )}
            
            {/* Estado actual */}
            {selectedUser && (
                <div className="px-4 py-2 text-xs text-blue-600 bg-blue-50 border-t border-gray-100">
                Filtrando por: <span className="font-medium">{selectedUser}</span>
                </div>
            )}

            {/* Categoría Creador */}
            <div className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wide bg-gray-50">
              Creador
            </div>

            {/* Lista de usuarios */}
            {users.map((user) => (
              <button
                key={user}
                onClick={() => handleUserSelect(user)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                  selectedUser === user
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{user}</span>
                  {selectedUser === user && (
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
        </div>
      )}
    </div>
  );
};

export default SongFilter;