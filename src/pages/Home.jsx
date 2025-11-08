import { useEffect, useState } from "react";
import { getCharacters } from "../api/swapi";
import Card from "../components/Cards";
import Hero from "../components/HeroModal";
import SearchModal from "../components/SearchModal";
import FilterModal from "../components/FilterModal";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    homeworld: "",
    species: "",
    film: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getCharacters(page, search);
        setCharacters(res.results);
        setTotalPages(Math.ceil(res.count / 10));
      } catch (err) {
        setError("Failed to fetch characters");
      }
      setLoading(false);
    };
    fetchData();
  }, [page, search]);

  useEffect(() => {
    let updatedList = [...characters];

    if (search) {
      updatedList = updatedList.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
      // console.log(updatedList)
    }

    if (filters.homeworld) {
      updatedList = updatedList.filter((item) =>
        item.homeworld?.toLowerCase().includes(filters.homeworld.toLowerCase())
      );
      // console.log(updatedList)
    }

    if (filters.species) {
      updatedList = updatedList.filter(
        (item) =>
          item.species?.some((sp) =>
            sp.toLowerCase().includes(filters.species.toLowerCase())
          )
        // console.log(updatedList)
      );
    }

    if (filters.film) {
      updatedList = updatedList.filter(
        (item) =>
          item.films?.some((film) =>
            film.toLowerCase().includes(filters.film.toLowerCase())
          )
        // console.log(updatedList)
      );
    }

    setFilteredCharacters(updatedList);
  }, [search, filters, characters]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="mainHeading">
        <h1 className="text-3xl font-bold text-center mb-6">
          Star Wars Characters
        </h1>
      </div>

      <div className="md:flex md:justify-between md:items-center mb-4">
        <SearchModal value={search} onChange={(val) => setSearch(val)} />
        <FilterModal filters={filters} onChange={setFilters} />
      </div>

      {loading && <p className="text-center text-gray-400">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {filteredCharacters && filteredCharacters?.length > 0 ? (
              filteredCharacters?.map((char, index) => (
                <Card
                  key={index}
                  character={char}
                  onClick={(character) => setSelectedCharacter(character)}
                />
              ))
            ) : (
              <div className="noCharacters">
                <p className="text-center text-gray-400 col-span-full">
                  No characters found.
                </p>
              </div>
            )}
          </div>

          <div className="flex justify-center items-center gap-4 mt-8">
            <div>
              <button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
                  </svg>
                </div>
              </button>
            </div>
            <div className="pageInformation">
              <span>
                {page} / {totalPages}
              </span>
            </div>
            <div>
              <button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
              >
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#e3e3e3"
                  >
                    <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </>
      )}

      {selectedCharacter && (
        <Hero
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
};

export default Home;
