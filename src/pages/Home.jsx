import { useEffect, useState } from "react";
import { getCharacters } from "../api/swapi";
import Cards from "../components/Cards";
import Hero from "../components/HeroModal";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getCharacters(page);
        setCharacters(res.results);
        setTotalPages(Math.ceil(res.count / 10));
      } catch (err) {
        setError("Failed to fetch characters");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="mainHeading ">
        <h1 className="text-3xl font-bold text-center mb-6">
          Star Wars Characters
        </h1>
      </div>
      {loading && <p className="text-center text-gray-400">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {characters.map((item, i) => (
              <Cards
                key={i}
                character={item}
                onClick={() => setSelectedCharacter(item)}
              />
            ))}
          </div>
          <div className="pagination">
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50 text-xl cursor-pointer "
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
            <div className="pageNumberInfo">
            <span>
              {page} - {totalPages}
            </span>
            </div>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="bg-gray-700 px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50 text-xl cursor-pointer"
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
