import { useEffect, useState } from "react";
import { getHomeworld } from "../api/swapi";

export default function HeroModal({ character, onClose }) {
  const [homeworld, setHomeworld] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeworld = async () => {
      try {
        const data = await getHomeworld(character.homeworld);
        setHomeworld(data);
      } catch (error) {
        console.error("Failed to fetch homeworld:", error);
      } finally {
        setLoading(false);
      }
    };
    if (character) fetchHomeworld();
  }, [character]);

  if (!character) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 text-white rounded-lg shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-400 hover:text-white text-2xl"
        >
          ✖
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            {character.name}
          </h2>

          {loading ? (
            <p className="text-center text-gray-400">Loading details...</p>
          ) : (
            <>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Height:</strong> {character.height / 100} m
                </p>
                <p>
                  <strong>Mass:</strong> {character.mass} kg
                </p>
                <p>
                  <strong>Birth Year:</strong> {character.birth_year}
                </p>
                <p>
                  <strong>Films:</strong> {character.films.length}
                </p>
                {homeworld && (
                  <>
                    <p>
                      <strong>Homeworld:</strong> {homeworld.name}
                    </p>
                    <p>
                      <strong>Terrain:</strong> {homeworld.terrain}
                    </p>
                    <p>
                      <strong>Climate:</strong> {homeworld.climate}
                    </p>
                    <p>
                      <strong>Population:</strong> {homeworld.population}
                    </p>
                  </>
                )}
              </div>

              <p className="text-xs text-gray-400 mt-4">
                Added on: {new Date().toLocaleDateString("en-GB")}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
