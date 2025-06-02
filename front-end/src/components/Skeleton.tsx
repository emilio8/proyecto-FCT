"use client";

const Skeleton = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden animate-pulse w-72 h-80">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-4">
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
        <div className="flex space-x-4">
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;