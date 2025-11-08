import React from "react";

const SearchModal = ({ value, onChange }) => {
  return (
    <div className="searchModal">
      <div className="flex md:justify-center mb-6">
        <input
          type="text"
          placeholder="Search character name"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full max-w-md bg-gray-800 text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
};

export default SearchModal;
