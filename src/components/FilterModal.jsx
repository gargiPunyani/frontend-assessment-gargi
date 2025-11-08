import React from "react";

const FilterModal = ({ filters, onChange }) => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <div>
        <select
          value={filters.homeworld}
          onChange={(e) => onChange({ ...filters, homeworld: e.target.value })}
          className="border border-gray-400 rounded-md p-2 bg-gray-900 text-white"
        >
          <option value="">All Homeworlds</option>
          <option value="Tatooine">Tatooine</option>
          <option value="Alderaan">Alderaan</option>
          <option value="Naboo">Naboo</option>
          <option value="Coruscant">Coruscant</option>
        </select>
      </div>
      <div>
        <select
          value={filters.species}
          onChange={(e) => onChange({ ...filters, species: e.target.value })}
          className="border border-gray-400 rounded-md p-2 bg-gray-900 text-white"
        >
          <option value="">All Species</option>
          <option value="Human">Human</option>
          <option value="Droid">Droid</option>
          <option value="Wookiee">Wookiee</option>
        </select>
      </div>
      <div>
        <select
          value={filters.film}
          onChange={(e) => onChange({ ...filters, film: e.target.value })}
          className="border border-gray-400 rounded-md p-2 bg-gray-900 text-white"
        >
          <option value="">All Films</option>
          <option value="A New Hope">A New Hope</option>
          <option value="The Empire Strikes Back">
            The Empire Strikes Back
          </option>
          <option value="Return of the Jedi">Return of the Jedi</option>
          <option value="The Phantom Menace">The Phantom Menace</option>
        </select>
      </div>
    </div>
  );
};

export default FilterModal;
